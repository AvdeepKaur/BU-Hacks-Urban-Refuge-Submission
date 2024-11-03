export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        paddingBottom: "15px",
      }}
    >
      <img
        src="/images/urban.png"
        alt="MapRefuge Logo"
        style={{ width: "100px", height: "auto" }} // Adjust the size as needed
      />
      <p
        style={{
          fontSize: "35px",
          fontFamily: "Cocomat Pro",
          fontWeight: "bold",
          textTransform: "uppercase",
          margin: "0 auto",
        }}
      >
        Map Refuge
      </p>
    </div>
  );
}
