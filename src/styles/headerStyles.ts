export const outerContainerCss = {
  minHeight: "200vh",
}

export const headerContainerCss = {
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  overflow: "hidden",
  position: "sticky" as const,
  top: 0,
  maxWidth: "1520px",
  margin: "0 auto",
  zIndex: 1,
  "@media (max-width: 600px)": {
    height: "100svh",
  },
}

export const containerCss = {
  display: "flex",
  flexDirection: "column",
  padding: "0.75rem",
  height: "calc(100vh - 1.5rem)",
  justifyContent: "space-between",
  position: "relative",
  zIndex: 2,
  textTransform: "uppercase",
  "@media (max-width: 600px)": {
    height: "auto",
    justifyContent: "flex-start",
    gap: "1.35rem",
  },
}

export const greyTextCss = {
  color: "grey",
}

export const blackTextCss = {
  color: "black",
}

export const linksContainerCss = {
  display: "flex",
  gap: "1rem",
  justifyContent: "space-between",
}

export const baseLinkCss = {
  color: "black",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}

export const linkCss = {
  textDecoration: "none",
  color: "black",
  fontWeight: 500,
  fontSize: "16px",
  textTransform: "uppercase",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}

export const descriptionCss = {
  display: "flex",
  fontWeight: 500,
  flexDirection: "column",
  gap: "0.75rem",
  maxWidth: "300px",
  textTransform: "uppercase",
  minHeight: 141,
  "@media (max-width: 1150px)": {
    maxWidth: "550px",
  },
  "@media (max-width: 600px)": {
    minHeight: "auto",
    gap: "0.45rem",
  },
}

export const socialLinksCss = {
  display: "flex",
  gap: "1rem",
}

export const heroImageCss = {
  height: "auto",
  maxHeight: "90vh",
  maxWidth: "100%",
  minWidth: "400px",
  position: "absolute" as const,
  bottom: 0,
  left: "53%",
  userSelect: "none",
  zIndex: 1,
  transform: "translateX(-50%)",
  "@media (max-width: 1150px)": {
    maxWidth: "600px",
    position: "relative",
    transform: "none",
    left: "auto",
    margin: "0 auto",
  },
  "@media (max-width: 500px)": {
    left: "-40px",
    maxHeight: "70svh",
  },
  "@media (max-width: 450px)": {
    left: "-5px",
    maxHeight: "55svh",
  },
  "@media (max-width: 385px)": {
    maxWidth: "500px",
    left: "-40px",
  },
}

export const blackSectionCss = {
  backgroundColor: "black",
  zIndex: 10,
  position: "relative",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "5rem",
  paddingBottom: "5rem",
  width: "100%",
  minHeight: "500px"
}

export const whiteProjectsSectionCss = {
  backgroundColor: "white",
  zIndex: 10,
  position: "relative",
  maxWidth: "1520px",
  margin: "0 auto",
}

export const projectGridCss = {
  borderBottom: "1px solid #E5E5E5",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
}

export const projectLeftCss = {
  borderRight: "1px solid #E5E5E5",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}

export const projectRightCss = {
  overflow: "hidden",
}

export const projectLeftReverseCss = {
  borderLeft: "1px solid #E5E5E5",
  borderRight: "none",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}

export const projectHeaderCss = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
}

export const projectImageCss = {
  width: "100%",
  height: "auto",
  display: "block",
  margin: "1rem 0",
}

export const projectDescriptionCss = {
  maxWidth: 550,
}

export const projectMetaCss = {
  display: "flex",
  gap: "4rem",
}

export const projectMetaLabelCss = {
  color: "grey",
}
