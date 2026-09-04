function Loading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative flex items-center justify-center">
        {/* Soft glow behind the loader */}
        <div
          className="absolute h-20 w-20 rounded-full blur-xl opacity-30"
          style={{
            background: "var(--gold)",
          }}
        />

        {/* Outer ring */}
        <div
          className="relative h-16 w-16 animate-spin rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "var(--gold)",
            borderRightColor: "var(--brown-500)",
            boxShadow: "var(--shadow-gold)",
          }}
        />

        {/* Inner ring */}
        <div
          className="absolute h-10 w-10 animate-spin rounded-full border-4 border-transparent [animation-direction:reverse] [animation-duration:1.5s]"
          style={{
            borderBottomColor: "var(--orange)",
            borderLeftColor: "var(--gold)",
          }}
        />

        {/* Center dot */}
        <div
          className="absolute h-2.5 w-2.5 rounded-full animate-pulse"
          style={{
            background: "var(--gold)",
            boxShadow: "0 0 12px rgba(207, 162, 71, 0.7)",
          }}
        />
      </div>
    </main>
  );
}

export default Loading;
