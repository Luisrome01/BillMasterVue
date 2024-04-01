<template>
    <div class="InputDContainer">
      <p class="InputDTitle">{{ name }}</p>
      <input 
        :type="type" 
        :placeholder="placeholder" 
        :style="style" 
        class="InputDiferente" 
        v-model="inputText" 
        :disabled="disabled" 
        :id="id"
        @input="handleChange"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'InputDiferente',
    props: {
      type: String,
      placeholder: String,
      width: String,
      height: String,
      color: String,
      borderRadius: String,
      shadow: String,
      name: String,
      flexBasis: String,
      disabled: Boolean,
      id: String,
      value: String,
      updateState: Function
    },
    data() {
      return {
        inputText: this.value || ''
      };
    },
    computed: {
      style() {
        return {
          height: this.height || '32px',
          backgroundColor: this.color || 'rgba(174, 187, 253, 0.25)',
          borderRadius: this.borderRadius || '10px',
          boxShadow: this.shadow,
          width: this.width
        };
      }
    },
    methods: {
      handleChange(event) {
        this.inputText = event.target.value;
        if (this.$props.updateState) {
          this.$props.updateState(event.target.value);
        }
      }
    },
    watch: {
      value(newValue) {
        this.inputText = newValue;
      }
    }
  };
  </script>
  
  <style scoped>
  .InputDiferente {
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.25);
    margin-left: 10px;
  }
  
  .InputDTitle {
    font-weight: bold;
    font-size: 15.2444px;
  }
  
  .InputDContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  input{
    border: none;
    outline: none;
    color: black;
  }
  </style>
  