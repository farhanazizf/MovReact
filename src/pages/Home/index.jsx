import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
// import { Autocomplete, TextField } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import MainLayout from "../../components/layout/MainLayout";
import http from "../../libs/http";
import Styled, { modalStyle } from "./style";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const reduxReducer = useSelector((state) => state);
  const [modals, setModals] = React.useState({ poster: "", show: false });
  const [firstData, setFirstData] = React.useState([]);
  const [pageNow, setPageNow] = React.useState(1);
  const [totalRes, setTotalRes] = React.useState("0");
  const [searchText, setSearchText] = React.useState("");
  const [valuez] = useDebounce(searchText, 600);
  // const reduxState = useSelector((state) => state);
  // console.log(reduxState);

  React.useEffect(() => {
    const getListMov = async () => {
      try {
        const { data } = await http.get(``, {
          params: {
            s: valuez,
            page: pageNow,
          },
        });
        // console.log(data);
        if (data.Response !== "False") {
          if (data.totalResults === totalRes) {
            // console.log("xnow", data.Search);
            setFirstData((firstt) => [...firstt, ...data.Search]);
          } else {
            setFirstData(data.Search);
          }
          setTotalRes(data.totalResults);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "LOADING_OFF" });
      }
    };
    getListMov();
    // eslint-disable-next-line
  }, [valuez, pageNow]);

  window.onscroll = function () {
    // @var int totalPageHeight
    var totalPageHeight = document.body.scrollHeight;

    // @var int scrollPoint
    var scrollPoint = window.scrollY + window.innerHeight;

    // check if we hit the bottom of the page
    if (scrollPoint >= totalPageHeight) {
      // console.log("at the bottom");
      if (firstData.length > 0) {
        dispatch({ type: "LOADING_ON" });
        setPageNow(pageNow + 1);
      }
    }
  };

  const handleOpenModals = (poster) => {
    if (poster !== "N/A") {
      setModals({ show: true, poster });
    }
  };

  const handleDetails = (imdbId) => {
    dispatch({ type: "SELECT_IMDB", value: imdbId });
    history.push(`/details/${imdbId}`);
  };

  return (
    <MainLayout>
      <Modal
        open={modals.show}
        onClose={() => setModals({ poster: "", show: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {modals.poster !== "" ? (
            <CardMedia
              component="img"
              // height="140"
              image={modals.poster}
              alt="Poster"
            />
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              No poster in this movies
            </Typography>
          )}
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>

      <Styled.TitleWrapper>
        <h2>Search Movies</h2>
      </Styled.TitleWrapper>
      <Styled.SearchWrapper>
        <Styled.Search
          // {...params}
          label="Search Movies"
          onChange={(ex) => setSearchText(ex.target.value)}
          InputProps={{
            // ...params.InputProps,
            type: "search",
          }}
        />
        {/* <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          // options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        /> */}
      </Styled.SearchWrapper>
      <Styled.CardWrapper>
        {firstData.map((vals) => (
          <Styled.Card key={vals.imdbID}>
            <Card sx={{ width: 345 }}>
              <CardActionArea onClick={() => handleOpenModals(vals.Poster)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={vals.Poster}
                  alt="poster"
                />
              </CardActionArea>
              <CardActionArea onClick={() => handleDetails(vals.imdbID)}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {vals.Title} ({vals.Year})
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography> */}
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                <Button size="small" color="primary">
                  See Poster
                </Button>
              </CardActions> */}
            </Card>
          </Styled.Card>
        ))}
      </Styled.CardWrapper>
      {/* <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to re load.
          </p>
          <a
            className="App-link"
            href="https:/ /reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </MainLayout>
  );
};

const mapsStateToProps = (state) => {
  return {
    vals: state.value,
  };
};

export default connect(mapsStateToProps)(Home);
