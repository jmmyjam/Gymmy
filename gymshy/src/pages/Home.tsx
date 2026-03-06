export default function Home() {
  const name = "Jimmy";
  if (name)
    return <div className="p-8">
            <h1 className="text-2xl font-bold">Home</h1>
            <h1> Hello, {name}! </h1>
          </div>
  return <div className="p-8">
            <h1 className="text-2xl font-bold">Home</h1>
            <h1> Welcome, Guest! </h1>
          </div>
}