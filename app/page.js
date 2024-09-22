import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center flex-col md:gap-3 justify-center h-[44vh] px-4 md:px-0 gap-7 text-white">
        <div className="md:text-5xl font-bold flex text-center items-center justify-center gap-4 text-3xl" > Buy Me a Chai <span><img width={44} src="/tea.gif" alt="" /></span></div>
        <p>Raise funds for your favourite creater Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure possimus voluptas esse !</p>
        <div>
          <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button></Link>

          <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10" >
      </div>



      <div className="text-white container mx-auto md:h-[44vh] h-[75vh] ">
        <h1 className="font-bold md:text-3xl text-center my-10 text-2xl">Your Fans can buy you a Chai</h1>
        <div className="flex gap-4 justify-around flex-col md:flex-row">
          <div className="item space-y-5 flex flex-col justify-center items-center">
            <img className="bg-slate-400 rounded-full p-4" width={88} src="/coin2.gif" alt="" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available for you and for help you</p>

          </div>
          <div className="item space-y-5 flex flex-col justify-center items-center">
            <img className="bg-slate-400 rounded-full p-4" width={88} src="/coin2.gif" alt="" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available for you and for help you</p>

          </div>
          <div className="item space-y-5 flex flex-col justify-center items-center">
            <img className="bg-slate-400 rounded-full p-4" width={88} src="/coin2.gif" alt="" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available for you and for help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10" >
      </div>

      <div className="text-white container mx-auto flex flex-col items-center justify-center py-10 ">
        <h1 className="font-bold text-3xl text-center my-10">Learn more About us</h1>
        <iframe className="md:w-1/3 md:h-96" src="https://www.youtube.com/embed/QtaorVNAwbI?si=Zbky1TuJhmtxrQsW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
