import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"



export const archive = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }
        const userId = identity.subject;

        const existingDocuments = await ctx.db.get(args.id)
        if (!existingDocuments) {
            throw new Error("Document not found");
        }
        if (existingDocuments.userId !== userId) {
            throw new Error("Not authorized");
        }
        const recursiveArchive = async (documentId: Id<'documents'>) => {
            const children = await ctx.db.query("documents")
                .withIndex("by_user_parent", (q) =>
                    q
                        .eq("userId", userId)
                        .eq("parentDocument", documentId)
                ).collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                })
                await recursiveArchive(child._id)
            };


        }
        const document = await ctx.db.patch(args.id, {
            isArchived: true
        });

        recursiveArchive(args.id)
        return document;

    }
})

export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }
        const userId = identity.subject;
        const documents = await ctx.db.query("documents")
            .withIndex("by_user_parent",
                (q) => q
                    .eq("userId", userId)
                    .eq("parentDocument", args.parentDocument)
            )
            .filter((q) => {
                console.log(q);
                return q.eq(q.field("isArchived"), false);
            }).collect()

        return documents;
    }
})

export const getTrash = query({

    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }
        const userId = identity.subject;
        const documents = await ctx.db.query("documents")
            .withIndex("by_user", (q) => q.eq('userId', userId))
            .filter((q) => {
                console.log(q);
                return q.eq(q.field("isArchived"), true);
            }).collect()

        return documents;
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }

        const userId = identity.subject;
        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isPublished: false,
            isArchived: false,
        });

        return document;
    }
})


export const restore = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Page does not exist");
        }
        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized");
        }

        const recursiveRestore = async (documentId: Id<"documents">) => {
            const children = await ctx.db.query("documents")
                .withIndex("by_user_parent", (q) =>
                    q
                        .eq("userId", userId)
                        .eq("parentDocument", documentId)
                ).collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: false,
                });
                await recursiveRestore(child._id)
            }
        }
        await recursiveRestore(args.id)
        const options: Partial<Doc<"documents">> = {
            isArchived: false,
        }

        if (existingDocument.parentDocument) {
            const parentDocument = await ctx.db.get(existingDocument.parentDocument);;
            if (parentDocument?.isArchived) {
                options.parentDocument = undefined;
            }
        }

        const document = await ctx.db.patch(args.id, options)
        return document

    }
})

export const remove = mutation({
    args: {
        id: v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Page does not exist");
        }
        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized");
        }

        const document = await ctx.db.delete(args.id);
        return document;
    }
})

export const getSearch = query({
    
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }
        const userId = identity.subject;
        const documents = await ctx.db.query("documents")
            .withIndex("by_user", (q) => q.eq('userId', userId))
            .filter((q) => 
                q.eq(q.field("isArchived"), false)
            )
            .order("desc")
            .collect()
        return documents;
    }
})

export const getById = query({
    args:{
        documentId:v.id("documents")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
       
        const document = await ctx.db.get(args.documentId);
        if (!document) {
            throw new Error("Page not found");
        }
        if(document.isPublished && !document.isArchived){
            return document;
        }
        if (!identity) {
            throw new Error("Not authenticated !!")
        }
        const userId = identity.subject;
        if (document.userId !== userId) {
            throw new Error("Not authorized");
        }
        return document;
    }
})

export const update = mutation({   
    args: { 
        id: v.id("documents"), 
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        icon: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }
        const userId = identity.subject;
        const {id, ...update} = args;
        const existingDocument = await ctx.db.get(id);
        if (!existingDocument) {
            throw new Error("Page not found");
        }
        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized");
        }
        const document = await ctx.db.patch(id, {...update});
        return document;
    
    }
 })

 export const removeIcon = mutation({
    args:{
        id:v.id("documents")
    },
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Page does not exist");
        }
        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized");
        }

        const document = await ctx.db.patch(args.id, {
            icon: undefined,
        });

        return document;
    }
 })
 export const removeCoverImage = mutation({
    args:{
        id:v.id("documents")
    },
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated !!")
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Page does not exist");
        }
        if (existingDocument.userId !== userId) {
            throw new Error("Not authorized");
        }

        const document = await ctx.db.patch(args.id, {
            coverImage: undefined,
        });

        return document;
    }
 })