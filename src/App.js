import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from "react-sidebar";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justify: "space-between"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  button: {
    textAlign: "center",
    padding: theme.spacing(2),
    width: "100%"
  },
  container: {
    border: "1px solid black"
  }
}));

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({});
  const products = Object.values(data);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const [cartList, setCartList] = useState([{"sku": "12064273040195392", "quantity": 1}, {"sku": "6090484789343891", "quantity": 3}]);

  const classes = useStyles();

  return (
<div className={classes.root}>
  <Grid justify="space-between" spacing={3} class={classes.button}>
  <Button variant="contained" color="primary">S</Button>
  <Button variant="contained" color="primary">M</Button>
  <Button variant="contained" color="primary">L</Button>
  <Button variant="contained" color="primary">XL</Button>
  </Grid>
<Grid container justify="flex-end">
  {products.map(product =>
    <Grid class={classes.container}>
      <Paper class={classes.paper}><img src={"./data/products/"+product.sku+"_2.jpg"}></img></Paper>
      <Paper class={classes.paper}>{product.title}</Paper>
      <Paper class={classes.paper}>
        {(() => {
          switch (product.isFreeShipping) {
            case true:   return "Free Shipping Available";
            case false:  return "No Free Shipping Available";
            default:     return "No Free Shipping Available";
          }
        })()}
      </Paper>
      <Paper class={classes.paper}>{product.currencyFormat}{product.price}</Paper>
      <Button variant="contained" color="primary">Primary</Button>
    </Grid>)}
</Grid>

<Sidebar
  sidebar={<div><button onClick={() => setSidebarOpen(!sidebarOpen)}>Close Shopping Cart</button><ul>{cartList.map(item => <li>{products.map(product => product.sku == item.sku ? product.title : null).join(" ") + ": " + item.quantity}</li>)}</ul></div>}
  open={sidebarOpen}
  styles={{ sidebar: {background: "black", color: "white"} }}
  >
    <button onClick={() => setSidebarOpen(!sidebarOpen)}>Open Shopping Cart</button> 

</Sidebar>
</div>

  );
};

export default App;