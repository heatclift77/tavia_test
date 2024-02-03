import AppIcon from "../AppIcon";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Paper,
  Collapse,
  Grid,
  useMediaQuery
} from "@mui/material";
import { useState } from "react";

export type Appartment = {
  pic: string,
  title: string,
  address: string,
  project_type: string,
  year: number,
  ownership_type: string,
  psf_min: number,
  psf_max: number,
  subprice_label: string,
  availabilities_label: string,
  description: string
};

interface Props {
  data: Appartment
}

function Apartment({
  data,
}: Props) {
  const theme = useTheme()
  const [isOpenDesc, setIsOpenDesc] = useState(false)
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState(false)
  const sm = useMediaQuery(theme.breakpoints.down("md"))

  // regex
  const phoneNumber = /\d{4}\s\d{4}/g // digit XXXX XXXX

  const toggleDescCollapse = () => {
    if (isOpenDesc)
      setIsOpenDesc(false)
    else setIsOpenDesc(true)
  }

  const toggleRevealsPn = () => {
    if (displayPhoneNumber)
      setDisplayPhoneNumber(false)
    else setDisplayPhoneNumber(true)
  }

  const renderDescription = (desc: string) => {
    if (!isOpenDesc) return <Box height={"80px"}></Box>
    const pn = desc.match(phoneNumber)?.toString()
    let hiddenPn = ""
    if (pn) {
      hiddenPn = pn?.toString().split(" ")[0] + " XXXX"
    }

    const otherDesc = desc.replace(/.*\d{4}\s\d{4}/g, "") // get string without phone number: XXXX XXXX

    return (
      <Box height={"80px"}>
        <Box component={"span"}>
          <Typography display={"inline"}>Phone Number : </Typography>
          <Button
            sx={{
              p: 0,
              minHeight: "unset",
              minWidth: "unset",
              fontSize: "16px"
            }}
            onClick={toggleRevealsPn}
          >
            {displayPhoneNumber ? pn : hiddenPn}
          </Button>
          <Typography display={"inline"}>{otherDesc}</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Paper sx={{ overflow: "hidden", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.palette.text.disabled,
          height: "480px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <img
          src={data.pic}
          loading="lazy"
          alt="thumb"
          style={{
            width: "auto",
            marginRight: "auto",
            marginLeft: "auto",
            position: "absolute",
            zIndex: 0,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      </Box>
      <Box p={3}>
        <Grid container>
          <Grid item xs={12} md={6} justifyContent={"flex-start"}>
            <Box display={"flex"} gap={2}>
              <AppIcon icon={"appicon:building"} width={60} height={60} />
              <Box>
                <Typography fontWeight={700} variant="h5">{data.title}</Typography>
                <Typography fontWeight={700} color={theme.palette.text.secondary}>{data.address}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={"flex-end"}
            sx={{
              position: sm ? "absolute" : "static",
              bottom: "84px",
              left: "24px"
            }}
          >
            <Box
              sx={{
                textAlign: "right",
                display: sm ? "flex" : "block",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography fontWeight={700} variant="h6">${data.psf_min} - ${data.psf_max}</Typography>
              <Typography fontWeight={700} color={theme.palette.text.secondary}>{data.subprice_label}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>{data.project_type}, {data.year}, {data.ownership_type}</Typography>
          <Typography>{data.availabilities_label}</Typography>
        </Box>
        <Collapse in={isOpenDesc} sx={{ mt: 2 }}>
          <Box>
            {renderDescription(data.description)}
          </Box>
        </Collapse>
        <Box display={"flex"} mt={sm ? 6 : 2}>
          <Button sx={{ marginLeft: "auto" }} color="warning" onClick={toggleDescCollapse} >See Description</Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default Apartment
