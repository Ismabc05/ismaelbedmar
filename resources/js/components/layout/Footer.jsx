export default function Footer() {
    return (
      <footer
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "white",
        }}
      >
        <div style={containerStyle}>
          <div style={sectionStyle}>
            <h4 style={headingStyle}>Sobre Nosotros</h4>
            <p style={textStyle}>
              Ofrecemos productos y servicios de alta calidad a nuestros clientes
              de todo el mundo.
            </p>
          </div>
          <div style={sectionStyle}>
            <h4 style={headingStyle}>Contactos</h4>
            <p style={textStyle}>Email: ismaelbedmarcejas@gmail.com</p>
            <p style={textStyle}>Email: cristiancosanocejas@gmail.com</p>
          </div>
          <div style={sectionStyle}>
            <h4 style={headingStyle}>Seguirnos</h4>
            <div>
              <a
                href="https://www.facebook.com/profile.php?id=100018710419037"
                style={linkStyle}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Facebook
              </a>{" "}
              |
              <a
                href="https://x.com/BedmarCeja30211"
                style={linkStyle}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Twitter
              </a>{" "}
              |
              <a
                href="https://www.instagram.com/ismael_bedmar/"
                style={linkStyle}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div style={copyrightStyle}>
          &copy; 2025 IsmaelBedmar. All Rights Reserved.
        </div>
      </footer>
    );
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const sectionStyle = {
    flex: "1",
    padding: "0 20px",
  };

  const headingStyle = {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#212121",
  };

  const textStyle = {
    fontSize: "14px",
    margin: "5px 0",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#007bff",
    margin: "0 5px",
    cursor: "pointer",
  };

  const copyrightStyle = {
    marginTop: "20px",
    fontSize: "12px",
    color: "#666",
  };
