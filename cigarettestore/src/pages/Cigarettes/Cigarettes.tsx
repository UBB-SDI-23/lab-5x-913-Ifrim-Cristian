import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Cigarette } from "../../models/cigarette";
import { CigaretteService } from "../../services/CigaretteService";
import { Grid, Pagination } from "@mui/material";
import style from "./Cigarettes.module.scss";
import CigaretteCard from "../../components/CigaretteCard/CigaretteCard";

const Cigarettes = () => {
  const [cigarettes, setCigarettes] = useState<Cigarette[]>([]);
  const cigaretteService = new CigaretteService();

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      const json = await cigaretteService.getAllCigarettes();
      if (!ignore) {
        setCigarettes(json);
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [cigaretteService]);

  return (
    <div className={style.wrapper}>
      <Navbar />
      <Grid
        container
        className={style.cigarettesGrid}
        columns={{ xs: 1, sm: 9, md: 12, lg: 12 }}
      >
        {Array.from(Array(24)).map((_, index) => (
          <Grid xs={1} sm={3} lg={2} key={index}>
            <CigaretteCard />
          </Grid>
        ))}
      </Grid>
      <Pagination count={10} shape="rounded" sx={{alignSelf: "flex-end", marginBottom: 5, marginLeft: 2}} />
    </div>
  );
};

export default Cigarettes;
