export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-center">
      <p className="font-mono text-xs text-slate-400">
        © {new Date().getFullYear()} · Built among the stars 🪐 · Configure your own site via{" "}
        <a href="/setup" className="text-cyan-300 underline">
          setup
        </a>
      </p>
    </footer>
  );
}
