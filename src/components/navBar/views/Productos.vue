<template>
    <div>
      <ProductTable :rows="listaProductos" />
    </div>
  </template>
  
  <script>
  import ProductTable from '../../../components/containers/products.vue';
  import productos from '../../../json/productos.json';
  
  export default {
    components: {
      ProductTable
    },
    data() {
      return {
        listaProductos: productos 
      };
    }
  };
  </script>
  
  <style>
  h1 {
    color: black;
  }
  </style>
  