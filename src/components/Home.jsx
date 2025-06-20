import main from './../assets/main.jpg';
export default function Home() {
  return (
    <div className="relative w-full">
      <img src={main} alt="main.jpg" className="w-full z-0" />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-white text-6xl font-bold bg-black bg-opacity-50 px-6 py-4 rounded">
          Welcome To Book World
        </span>
      </div>
    </div>
  );
}
