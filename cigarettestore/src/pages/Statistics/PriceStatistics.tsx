import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Grid, Pagination} from "@mui/material";
import style from "./PriceStatistics.module.scss";
import BrandCard from "../../components/BrandCard/BrandCard";
import { BrandService } from "../../services/BrandService";
import { Brand } from "../../models/brand";

const PriceStatistics = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(12);

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
      const json = await cigaretteService.getBrandPriceStatistics(page, pageSize);
      if (!ignore) {
        setBrands(json);
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [page, pageSize]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className={style.wrapper}>
      <Navbar />
      <Grid
        container
        className={style.cigarettesGrid}
        columns={{ xs: 1, sm: 9, md: 12, lg: 12 }}
      >
        {brands.map((_, index) => (
          <Grid item xs={1} sm={3} lg={2} key={index}>
            <BrandCard brand={brands[index]}>
                <br />
                Average price: {brands[index].averagePrice}
            </BrandCard>
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

export default PriceStatistics;
