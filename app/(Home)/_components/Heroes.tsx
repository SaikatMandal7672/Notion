import Image from "next/image"
const Heroes = () => {
  return (
    <div className="flex flex-col max-w-5xl justify-center items-center">
        <div className="flex items-center ">
            <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]" >
                <Image 
                fill
                className="object-contain"
                src="/home-image.png"
                alt="home page image"
                />
            </div>
            <div className="relative h-[370px] w-[370px] hidden md:block" >
                <Image 
                fill
                className="object-contain "
                src="/reading.png"
                alt="reading image"
                />
            </div>

        </div>
    </div>
  )
}

export default Heroes