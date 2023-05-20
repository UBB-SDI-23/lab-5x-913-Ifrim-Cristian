import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Cigarette } from "../../models/cigarette";
import { CigaretteService } from "../../services/CigaretteService";
import { Grid, Pagination} from "@mui/material";
import style from "./Brands.module.scss";
import CigaretteCard from "../../components/CigaretteCard/CigaretteCard";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddCigarette from "../../components/AddCigarette/AddCigarette";
import BrandCard from "../../components/BrandCard/BrandCard";
import { Brand } from "../../models/brand";
import { BrandService } from "../../services/BrandService";
import AddBrand from "../../components/AddBrands/AddBrand";

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
        Name
        {alignment === "BrandAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
      <ToggleButton value={alignment === "TypeAsc" ? "TypeDesc" : "TypeAsc"}>
        Year
        {alignment === "TypeAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
      <ToggleButton value={alignment === "NameAsc" ? "NameDesc" : "NameAsc"}>
        Country
        {alignment === "NameAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let ignore = false;
    const cigaretteService = new BrandService();

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
    const cigaretteService = new BrandService();

    async function startFetching() {
      const json = await cigaretteService.getAllBrands(page, pageSize);
      if (!ignore) {
        console.log(json);
        setBrands(json);
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
    const newCigarettes = [...brands];
    newCigarettes.sort((a, b) => {
      if (alignment === "BrandAsc") {
        return a.name.localeCompare(b.name);
      } else if (alignment === "BrandDesc") {
        return b.name.localeCompare(a.name);
      } else if (alignment === "YearAsc") {
        return a.year > b.year ? 1 : -1;
      } else if (alignment === "TypeDesc") {
        return b.year > a.year ? 1 : -1;
      } else if (alignment === "NameAsc") {
        return a.country.localeCompare(b.country);
      } else if (alignment === "NameDesc") {
        return b.country.localeCompare(a.country);
      }
      return 0;
    });

    setBrands(newCigarettes);
  };


  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.actionsWrapper}>
        <SortOptions onChange={onChange} />
        <AddBrand refreshPage={() => setRefresh(!refresh)} />
      </div>
      <Grid
        container
        className={style.cigarettesGrid}
        columns={{ xs: 1, sm: 9, md: 12, lg: 12 }}
      >
        {brands.map((_, index) => (
          <Grid item xs={1} sm={3} lg={2} key={index}>
            <BrandCard brand={brands[index]} />
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

export default Brands;
