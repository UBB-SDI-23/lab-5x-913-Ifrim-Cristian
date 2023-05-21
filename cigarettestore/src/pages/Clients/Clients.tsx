import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Client } from "../../models/client";
import { ClientService } from "../../services/ClientService";
import { Grid, Pagination } from "@mui/material";
import style from "./Clients.module.scss";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddClient from "../../components/AddClient/AddClient";
import ClientCard from "../../components/ClientCard/ClientCard";

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
      <ToggleButton value={alignment === "NameAsc" ? "NameDesc" : "NameAsc"}>
        Name
        {alignment === "NameAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
      <ToggleButton value={alignment === "EmailAsc" ? "EmailDesc" : "EmailAsc"}>
        Email
        {alignment === "EmailAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
      <ToggleButton
        value={alignment === "BirthdateAsc" ? "BirthdateDesc" : "BirthdateAsc"}
      >
        Birthdate
        {alignment === "BirthdateAsc" ? (
          <ArrowUpwardIcon sx={{ fontSize: 15 }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: 15 }} />
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let ignore = false;
    const clientService = new ClientService();

    async function startFetching() {
      const json = await clientService.getPageCount(pageSize);
      if (!ignore) {
        setPageCount(json);
      }
    }

    startFetching();
  }, [pageSize]);

  useEffect(() => {
    let ignore = false;
    const clientService = new ClientService();

    async function startFetching() {
      const json = await clientService.getAllClients(page, pageSize);
      if (!ignore) {
        console.log(json);
        setClients(json);
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
    const newClients = [...clients];
    newClients.sort((a, b) => {
      if (alignment === "NameAsc") {
        return (a.firstName + " " + a.secondName).localeCompare(
          b.firstName + " " + b.secondName
        );
      } else if (alignment === "NameDesc") {
        return (b.firstName + " " + b.secondName).localeCompare(
          a.firstName + " " + a.secondName
        );
      } else if (alignment === "EmailAsc") {
        return a.email.localeCompare(b.email);
      } else if (alignment === "EmailDesc") {
        return b.email.localeCompare(a.email);
      } else if (alignment === "BirthdateAsc") {
        return a.dateOfBirth.localeCompare(b.dateOfBirth);
      } else if (alignment === "BirthdateDesc") {
        return b.dateOfBirth.localeCompare(a.dateOfBirth);
      }
      return 0;
    });

    setClients(newClients);
  };

  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.actionsWrapper}>
        <SortOptions onChange={onChange} />
        <AddClient refreshPage={() => setRefresh(!refresh)} />
      </div>
      <Grid
        container
        className={style.cigarettesGrid}
        columns={{ xs: 1, sm: 9, md: 12, lg: 12 }}
      >
        {clients.map((_, index) => (
          <Grid item xs={1} sm={3} lg={2} key={index}>
            <ClientCard client={clients[index]} />
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

export default Clients;
