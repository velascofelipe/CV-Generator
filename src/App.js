import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    professionalProfile: "",
    workExperience: "",
    academicBackground: "",
    additionalInformation: "",
    contactName: "",
    contactEmail: "",
    contactLinkedin: "",
  });
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const generateCV = () => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    // Establecer la posición vertical inicial
    let yPosition = 20;
    // Agregar contenido al PDF
    doc.setFontSize(24); // Tamaño grande para el nombre
    doc.text(formData.contactName, 105, yPosition, { align: "center" }); // Texto centrado
    yPosition += 10; // Ajuste de posición vertical
    doc.setLineWidth(0.5); // Grosor de la línea divisoria
    doc.line(50, yPosition, 165, yPosition); // Dibujar la línea divisoria
    yPosition += 7; // Ajuste de posición vertical después de la línea
    doc.setFontSize(16); // Tamaño normal para el título
    doc.text(title, 105, yPosition, { align: "center" }); // Texto centrado
    yPosition += 20;

    // Función para agregar texto al PDF y dividirlo en múltiples líneas si es necesario
    const addText = (text) => {
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 10, yPosition);
      yPosition += splitText.length * 7; // Ajustar posición vertical en función del texto agregado
    };

    addText(`Perfil Profesional:\n${formData.professionalProfile}`);
    yPosition += 10;
    addText(`Experiencia Laboral:\n${formData.workExperience}`);
    yPosition += 10;
    addText(`Formación Académica:\n${formData.academicBackground}`);
    yPosition += 10;
    addText(`Información Adicional:\n${formData.additionalInformation}`);
    yPosition += 10;
    addText("Contacto:");
    yPosition += 10;
    addText(`Nombre: ${formData.contactName}`);
    yPosition += 10;
    addText(`Correo: ${formData.contactEmail}`);
    yPosition += 10;
    if (formData.contactLinkedin.trim() !== "") {
      addText(`LinkedIn: ${formData.contactLinkedin}`);
      yPosition += 10;
    }

    // Descargar el PDF automáticamente
    doc.save("mi_cv.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateCV();
  };

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <img
            src="https://camo.githubusercontent.com/c32134a6b1a765cdc9b2b5e65c369f174c18750b0164f6129c99213ec62d8a2e/68747470733a2f2f692e696d6775722e636f6d2f6c4c6c723530422e706e67"
            alt="Logo"
            width="40"
            height="50"
            style={{ marginRight: "10px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            velascofelipe
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: "25px" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            fontFamily: "Poppins",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "25px",
          }}
        >
          Generador de Curriculum
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
              <div className="textFieldContainer">
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2, color: "#333", fontWeight: "bold" }}
                >
                  Información Profesional
                </Typography>
                <TextField
                  fullWidth
                  label="Título o Profesión"
                  value={title}
                  onChange={handleTitleChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#333" },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  label="Perfil Profesional"
                  name="professionalProfile"
                  value={formData.professionalProfile}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#333" },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  label="Experiencia Laboral"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#333" },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  label="Formación Académica"
                  name="academicBackground"
                  value={formData.academicBackground}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#333" },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  label="Información Adicional"
                  name="additionalInformation"
                  value={formData.additionalInformation}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#333" },
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
              <div className="textFieldContainer">
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2, color: "#333", fontWeight: "bold" }}
                >
                  Contacto
                </Typography>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  margin="normal"

                />
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#333" },
                  }}
                />
                <TextField
                  fullWidth
                  label="LinkedIn (opcional)"
                  name="contactLinkedin"
                  value={formData.contactLinkedin}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#333" },
                  }}
                />
              </div>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1976D2",
                    "&:hover": { backgroundColor: "#063F76" },
                    width: "100%", // Ajusta el ancho del botón al 100% del contenedor
                    maxWidth: "350px", // Opcional: establece un ancho máximo para el botón
                    margin: "auto", // Centra el botón horizontalmente en el contenedor
                  }}
                >
                  Generar CV
                </Button>

              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default App;
