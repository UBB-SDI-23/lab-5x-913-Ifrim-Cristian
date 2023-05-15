import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Cigarette } from "../../models/cigarette";
import { CigaretteService } from "../../services/CigaretteService";
import { Grid, Pagination} from "@mui/material";
import style from "./Cigarettes.module.scss";
import CigaretteCard from "../../components/CigaretteCard/CigaretteCard";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddCigarette from "../../components/AddCigarette/AddCigarette";

function SortOptions({
  className,
  onChange,
}: {
  className?: string;
  onChange: (value: string) => void;
}) {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    onChange(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      className={className}
      aria-label="Platform"
    >
      <ToggleButton value={alignment === "BrandAsc" ? "BrandDesc" : "BrandAsc"}>
        Brand
        {alignment === "BrandAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
      <ToggleButton value={alignment === "TypeAsc" ? "TypeDesc" : "TypeAsc"}>
        Type
        {alignment === "TypeAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
      <ToggleButton value={alignment === "NameAsc" ? "NameDesc" : "NameAsc"}>
        Name
        {alignment === "NameAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const Cigarettes = () => {
  const [cigarettes, setCigarettes] = useState<Cigarette[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let ignore = false;
    const cigaretteService = new CigaretteService();

    async function startFetching() {
      const json = await cigaretteService.getPageCount(pageSize);
      if (!ignore) {
        setPageCount(json);
      }
    }

    startFetching();
  }, [pageSize]);

  useEffect(() => {
    let ignore = false;
    const cigaretteService = new CigaretteService();

    async function startFetching() {
      const json = await cigaretteService.getAllCigarettes(page, pageSize);
      if (!ignore) {
        console.log(json);
        setCigarettes(json);
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [page, pageSize, refresh]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onChange = (alignment: string) => {
    console.log(alignment);
    const newCigarettes = [...cigarettes];
    newCigarettes.sort((a, b) => {
      if (alignment === "BrandAsc") {
        return a.brand.name.localeCompare(b.brand.name);
      } else if (alignment === "BrandDesc") {
        return b.brand.name.localeCompare(a.brand.name);
      } else if (alignment === "TypeAsc") {
        return a.type.localeCompare(b.type);
      } else if (alignment === "TypeDesc") {
        return b.type.localeCompare(a.type);
      } else if (alignment === "NameAsc") {
        return a.model.localeCompare(b.model);
      } else if (alignment === "NameDesc") {
        return b.model.localeCompare(a.model);
      }
      return 0;
    });

    setCigarettes(newCigarettes);
  };


  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.actionsWrapper}>
        <SortOptions onChange={onChange} />
        <AddCigarette refreshPage={() => setRefresh(!refresh)} />
      </div>
      <Grid
        container
        className={style.cigarettesGrid}
        columns={{ xs: 1, sm: 9, md: 12, lg: 12 }}
      >
        {cigarettes.map((_, index) => (
          <Grid item xs={1} sm={3} lg={2} key={index}>
            <CigaretteCard cigarette={cigarettes[index]} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChange}
        shape="rounded"
        sx={{ alignSelf: "flex-end", marginBottom: 5, marginLeft: 2 }}
      />
    </div>
  );
};

export default Cigarettes;
