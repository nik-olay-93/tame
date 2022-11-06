export default function Home() {
  return (
    <div>
      {new Array(100).fill(0).map((_, i) => (
        <div key={i}>hi from home</div>
      ))}
    </div>
  );
}

