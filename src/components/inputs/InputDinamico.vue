<template>
    <div class="IDIFMainContainer">
      <p class="IDIFTitle">{{ tipoDocumento }}</p>
      <select v-model="tipoDocumento" @change="handleTipoDocumentoChange" class="IDIFSelect">
        <option value="ID Extranjero">ID Extranjero</option>
        <option value="Cedula">Cédula de Identidad</option>
        <option value="Pasaporte">Pasaporte</option>
      </select>
      <div v-if="tipoDocumento">
        <input v-model="valorDocumento" :style="style" type="text" class="IDIFInput" placeholder="Ingrese el número de documento" @blur="handleBlur">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InputDinamico',
    props: {
      width: String,
      height: String,
      color: String,
      value: String,
    },
    data() {
      return {
        tipoDocumento: 'Cedula',
        valorDocumento: this.value || '',
      };
    },
    computed: {
      style() {
        return {
          width: this.width,
          height: this.height,
          backgroundColor: this.color,
        };
      },
    },
    watch: {
      value(newVal) {
        this.valorDocumento = newVal;
      },
    },
    methods: {
      handleTipoDocumentoChange(event) {
        if (this.$props.onTypeChange) {
          this.$props.onTypeChange(event.target.value);
        }
      },
      handleBlur() {
        if (this.$props.onBlur) {
          this.$props.onBlur();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .IDIFInput {
    margin-left: 10px;
    width: 300px;
    height: 30px;
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.25);
    border-radius: 10px;
    border: none;
    outline: none;
  }
  
  .IDIFInput:focus {
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.75);
    color: black;
  }
  
  .IDIFMainContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .IDIFSelect {
    margin-left: 10px;
    color: black;
    width: 18px;
    height: 18px;
    border: 2px solid black;
    border-radius: 3px;
    background-color: #ffffff;
  }
  
  .IDIFTitle {
    font-weight: bold;
  }
  </style>
  