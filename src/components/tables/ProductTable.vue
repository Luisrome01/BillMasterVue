<template>
    <div :style="containerStyle" class="ProductTableContainer">
      <div class="ProductTableWrapper">
        <div class="ProductTableHeader">
          <p></p>
          <p style="justify-self: left;">Código del producto</p>
          <p>Descripción</p>
          <p>Cantidad</p>
          <p>Precio/Unidad</p>
          <p>IVA</p>
          <p>Total</p>
          <p></p>
        </div>
        <div class="ProductTableBody" ref="tableBody">
          <div v-for="(row, index) in rows" :key="index" class="ProductTableRow">
            <button @click="eliminarProducto(row.codigo)" style="justify-self: center; border: none; background-color: transparent;">
              <img src="../../assets/trashbin.svg" alt="Eliminar">
            </button>
            <p style="justify-self: left;">{{ row.codigo }}</p>
            <p>{{ row.descripcion }}</p>
            <p>{{ row.cantidad }}</p>
            <p>$ {{ row.precio }}</p>
            <p>$ {{ row.iva }}</p>
            <p>$ {{ row.total.toFixed(2) }}</p>
            <button style="border: none; background-color: transparent; padding-right: 15px;">
              <img src="../../assets/explore.svg" alt="Explorar">
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductTable',
    props: {
      rows: Array
    },
    computed: {
      containerStyle() {
        return {
          alignSelf: 'center',
          border: '1.42917px solid #000000',
          boxShadow: '3.81111px 5.71667px 0px #000000',
          borderRadius: '22.8667px'
        };
      }
    },
    methods: {
        addToCart(producto) {
      // Agregar el producto a la lista de productos
      this.listProductos.push(producto);
    },
      eliminarProducto(codigo) {
        this.$emit('eliminarProducto', codigo);
      }
    }
  };
  </script>
  
  <style scoped>
  .ProductTableContainer {
    align-self: center;
    border: 1.42917px solid #000000;
    box-sizing: border-box;
    box-shadow: 3.81111px 5.71667px 0px #000000;
    border-radius: 22.8667px;
  }
  
  .ProductTableWrapper {
    display: flex;
    flex-direction: column;
    height: 35vh;
  }
  
  .ProductTableHeader {
    display: grid;
    align-items: center;
    justify-items: right;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
    padding: 15px;
    padding-right: 25px;
    background-color: #d6d6d6;
    border-radius: 22.8667px 22.8667px 0px 0px;
  }
  
  .ProductTableBody {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    margin-right: 10px;
  }
  
  .ProductTableRow {
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
    align-items: center;
    justify-items: right;
    margin-top: 25px;
  }
  
  .ProductTableHeader p {
    font-size: 15px;
    font-weight: bold;
  }
  
  .ProductTableRow p {
    font-size: 15px;
  }
  
  .ProductTableBody::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  
  .ProductTableBody::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
  
  .ProductTableBody::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  
  .ProductTableBody::-webkit-scrollbar-track {
    background-color: #dadada;
    border-radius: 3px;
  }
  
  .ProductTableBody::-webkit-scrollbar-track:hover {
    background-color: #f1f1f1;
  }
  </style>
  