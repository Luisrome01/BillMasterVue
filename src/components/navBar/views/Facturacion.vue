<template>
    <div class="FacturaContainer">
      <h1 class="FacturaHeaderContainer">Nueva Factura</h1>
  
      <div class="FacturaInputsEntre2">
        <div class="FacturaInput1">
          <div class="FacturaCedula-nombre">
            <div class="FacturaCedula">
              <InputDinamico
                :value="getValorIdentificacion"
                name="Cedula o Pasaporte:"
                color="#D9D9D9"
                width="200px"
                @blur="handleOnBlur"
                @onTypeChange="newType => setIdentificacion(newType)"
                @onValueChange="newValue => setValorIdentificacion(newValue)"
              />
            </div>
  
            <div class="FacturaNombre">
              <InputDiferente
                :value="getValorNombre"
                name="Nombre:"
                color="#D9D9D9"
                width="50%"
                placeholder="ej. Jhon Doe"
                @change="newName => setName(newName)"
                :disabled="disabledInput"
              />
            </div>
          </div>
          <div class="FacturaDireccion">
            <InputDiferente
              name="Direccion:"
              :value="getValorDireccion"
              flexBasis="100%"
              color="#D9D9D9"
              width="70%"
              placeholder="ej. Avenida Río Caura Torre Humboldt Prados del Este Piso 20 Oficina 20-06"
              :disabled="disabledInput"
              @change="newDireccion => setDireccion(newDireccion)"
            />
          </div>
          <div class="FacturaRif-BotonCrear">
            <div class="FacturaRif">
              <InputDiferente
                :value="getValorRif"
                name="Rif:"
                color="#D9D9D9"
                width="80%"
                placeholder="ej. J123456789"
                :disabled="disabledInput"
                @change="newRif => setRif(newRif)"
              />
            </div>
            <div class="FacturaBotonCrear">
              <BtnGeneral :img="svgAdd" text="Crear Cliente" width="165px" @click="createClient" />
            </div>
          </div>
        </div>
  
        <div class="FacturaInput2">
          <div class="FacturaoCodigo-buscar">
            <div class="FacturaCodigo">
              <InputDiferente
                :value="getValorCodigo"
                name="Codigo:"
                color="#D9D9D9"
                @change="newValue => {
                  setCodigo(newValue);
                  setValorCodigo(newValue);
                }"
              />
            </div>
            <div class="FacturaBuscar">
              <button class="FacturaSearch">
                <img :src="svgSearch" alt="Buscar">
              </button>
            </div>
          </div>
          <div class="FacturaCantidad">
            <InputDiferente
              :value="getValorCantidad"
              type="number"
              name="Cantidad:"
              color="#D9D9D9"
              width="80px"
              placeholder="1"
              @change="newCantidad => {
                setCantidad(newCantidad);
                setValorCantidad(newCantidad);
              }"
            />
          </div>
          <div class="FacturaBotonAgregar">
            <BtnGeneral :img="svgAdd" text="Agregar Producto" width="200px" @click="addProduct" />
          </div>
        </div>
      </div>
  
      <div class="FacturaTableContainer">
        <ProductTable width="90%" height="85%" :rows="listProductos" @eliminarProducto="eliminarProducto" />
      </div>
  
      <div class="FacturaCheckoutContainer">
        <div style="display: flex; flex-direction: column;">
          <p style="position: relative; margin-left: auto; font-size: 18px;">Total:</p>
          <p style="position: relative; margin-left: auto; font-size: 25.4331px; font-weight: bold;">$ {{ montoTotal }}</p>
        </div>
        <BtnGeneral
          text="Metodo de Pago"
          width="140px"
          color="#ff6060"
          img="cartSVG"
          @click="continueToPayment"
          style="background-color: #ff6060;"
          :class="{ 'hover-class': hovered }"
        />
      </div>
    </div>
  </template>
  
  <script>
  import InputDinamico from "../../../components/inputs/InputDinamico.vue";
  import InputDiferente from "../../../components/inputs/InputDiferente.vue";
  import BtnGeneral from "../../../components/buttons/BtnGeneral.vue";
  import ProductTable from "../../tables/ProductTable.vue";
  import { ref, watchEffect } from "vue";
  import svgAdd from "../../../assets/svg_add.svg";
import svgSearch from "../../../assets/SearchSVG.svg";
  
export default {
  name: "Facturacion",
  components: {
    InputDinamico,
    InputDiferente,
    BtnGeneral,
    ProductTable,
  },
    props: {
      setListaProductosExterna: Function,
      continuarVista: Function,
      listaProductosInterna: Array,
      setClienteExterno: Function,
      ClienteExterno: Object,
    },
    setup(props) {
        const listProductos = ref([]);
      const montoTotal = ref("0.00");
      const getCantidad = ref(1);
      const getCodigo = ref("");
      const getIdentificacion = ref("Cedula");
      const getValorIdentificacion = ref(
        props.ClienteExterno
          ? props.ClienteExterno.ci || props.ClienteExterno.pasaporte || props.ClienteExterno.idExtranjera
          : ""
      );
      const getClientes = ref([]);
      const getValorNombre = ref(props.ClienteExterno ? props.ClienteExterno.name : "");
      const getValorDireccion = ref(props.ClienteExterno ? props.ClienteExterno.direccion : "");
      const getValorRif = ref(props.ClienteExterno ? props.ClienteExterno.rif : "");
      const getValorCodigo = ref("");
      const getValorCantidad = ref("");
      const getName = ref("");
      const getDireccion = ref("");
      const getRif = ref("");
      const disabledInput = ref(false);
  
      watchEffect(() => {
        let total = 0;
        listProductos.value.forEach((element) => {
          total += parseFloat(element.total);
        });
        montoTotal.value = total.toFixed(2);
      });
  
      const eliminarProducto = (codigo) => {
        const index = listProductos.value.findIndex((element) => element.codigo === codigo);
        if (index !== -1) {
          const updatedProductos = [...listProductos.value];
          updatedProductos.splice(index, 1);
          listProductos.value = updatedProductos;
        }
      };
  
      const addProduct = () => {
      const nuevoProducto = {
        codigo: getCodigo.value,
        cantidad: getCantidad.value,
        // Otros atributos del producto...
      };
      listProductos.value.push(nuevoProducto);
      // Limpiar campos de entrada si es necesario
      getCodigo.value = '';
      getCantidad.value = 1;
      // Otros campos de entrada que necesiten limpiarse...
    };
  
      const handleOnBlur = () => {
        // Function logic...
      };
  
      const createClient = () => {
        // Function logic...
      };
  
      const continueToPayment = () => {
        // Function logic...
      };
  
      return {
        listProductos,
        montoTotal,
        getCantidad,
        getCodigo,
        getIdentificacion,
        getValorIdentificacion,
        getClientes,
        getValorNombre,
        getValorDireccion,
        getValorRif,
        getValorCodigo,
        getValorCantidad,
        getName,
        getDireccion,
        getRif,
        disabledInput,
        eliminarProducto,
        addProduct,
        handleOnBlur,
        createClient,
        continueToPayment,
      };
    },
  };
  </script>
  
  <style scoped>
  .FacturaContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 85vh;
    background-color: #ffff;
    position: relative;
  }
  
  .FacturaHeaderContainer {
    flex-basis: 10%;
    margin-left: 7%;
    align-items: center;
    display: flex;
  }
  
  .FacturaTableContainer {
    width: 100%;
    display: flex;
    align-self: center;
    justify-content: center;
    flex-basis: 50%;
  }
  
  .FacturaCheckoutContainer {
    align-self: normal;
    flex-basis: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    margin-left: auto;
    margin-right: 10%;
  }
  
  .FacturaInputsEntre2 {
    flex-basis: 25%;
    display: grid;
    grid-template-columns: 70% 30%;
  }
  
  .FacturaInput1 {
    display: flex;
    flex-direction: column;
  }
  
  .FacturaCedula-nombre {
    align-items: center;
    flex-basis: 33%;
    display: flex;
    flex-direction: row;
  }
  
  .FacturaCedula {
    margin-left: 10%;
    flex-basis: 58%;
  }
  
  .FacturaNombre {
    flex-basis: 42%;
  }
  
  .FacturaDireccion {
    margin-left: 10%;
    flex-basis: 33%;
    width: 100%;
    display: flex;
    align-items: center;
  }
  
  .FacturaRif-BotonCrear {
    align-items: center;
    flex-basis: 33%;
    display: flex;
    flex-direction: row;
  }
  
  .FacturaRif {
    margin-left: 10%;
    flex-basis: 60%;
  }
  
  .FacturaBotonCrear {
    flex-basis: 40%;
  }
  
  .FacturaInput2 {
    display: flex;
    flex-direction: column;
  }
  
  .FacturaoCodigo-buscar {
    flex-basis: 33%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .FacturaCodigo {
    flex-basis: 50%;
  }
  
  .FacturaBuscar {
    flex-basis: 50%;
  }
  
  .FacturaSearch {
    margin-left: 20px;
    background-color: transparent;
    border: none;
  }
  
  .FacturaCantidad {
    display: flex;
    align-items: center;
    flex-basis: 33%;
  }
  
  .FacturaBotonAgregar {
    display: flex;
    align-items: center;
    flex-basis: 33%;
  }
  
  .hover-class:hover {
    background-color: #c54444;
  }
  </style>
  