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
              @onTypeChange="(newType) => setIdentificacion(newType)"
              @onValueChange="(newValue) => setValorIdentificacion(newValue)"
            />
          </div>

          <div class="FacturaNombre">
            <InputDiferente
              :value="nombreCliente"
              name="Nombre:"
              color="#D9D9D9"
              width="50%"
              placeholder="ej. Jhon Doe"
              @change="(newName) => setName(newName)"
              :disabled="disabledInput"
            />
          </div>
        </div>
        <div class="FacturaDireccion">
          <InputDiferente
            name="Direccion:"
            :value="direccionCliente"
            flexBasis="100%"
            color="#D9D9D9"
            width="70%"
            placeholder="ej. Avenida Río Caura Torre Humboldt Prados del Este Piso 20 Oficina 20-06"
            :disabled="disabledInput"
            @change="(newDireccion) => setDireccion(newDireccion)"
          />
        </div>
        <div class="FacturaRif-BotonCrear">
          <div class="FacturaRif">
            <InputDiferente
              :value="rifCliente"
              name="Rif:"
              color="#D9D9D9"
              width="80%"
              placeholder="ej. J123456789"
              :disabled="disabledInput"
              @change="(newRif) => setRif(newRif)"
            />
          </div>
          <div class="FacturaBotonCrear">
            <BtnGeneral
              :img="svgAdd"
              text="Crear Cliente"
              width="165px"
              @click="createClient"
            />
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
              @change="
                (newValue) => {
                  /* setCodigo(newValue);
              setValorCodigo(newValue); */
                }
              "
              ref="inputCodigo"
            />
          </div>
          <div class="FacturaBuscar">
            <button class="FacturaSearch">
              <img :src="svgSearch" alt="Buscar" />
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
            ref="inputCantidad"
          />
        </div>
        <div class="FacturaBotonAgregar">
          <BtnGeneral
            :img="svgAdd"
            text="Agregar Producto"
            width="200px"
            @click="addProduct"
          />
        </div>
      </div>
    </div>

    <div class="FacturaTableContainer">
      <ProductTable
        width="90%"
        height="85%"
        :rows="listProductos"
        @eliminarProducto="eliminarProducto"
      />
    </div>

    <div class="FacturaCheckoutContainer">
      <div style="display: flex; flex-direction: column">
        <p style="position: relative; margin-left: auto; font-size: 18px">
          Total:
        </p>
        <p
          style="
            position: relative;
            margin-left: auto;
            font-size: 25.4331px;
            font-weight: bold;
          "
        >
          $ {{ montoTotal }}
        </p>
      </div>
      <BtnGeneral
        text="Metodo de Pago"
        width="150px"
        color="#ff6060"
        :img="cartSVG"
        @click="continueToPayment"
      />
    </div>
  </div>
</template>

<script>
import InputDinamico from "../../../components/inputs/InputDinamico.vue";
import InputDiferente from "../../../components/inputs/InputDiferente.vue";
import BtnGeneral from "../../../components/buttons/BtnGeneral.vue";
import ProductTable from "../../tables/ProductTable.vue";
import { ref, watch } from "vue";
import svgAdd from "../../../assets/svg_add.svg";
import svgSearch from "../../../assets/SearchSVG.svg";
import cartSVG from "../../../assets/marketKart.svg";

export default {
  name: "Facturacion",
  components: {
    InputDinamico,
    InputDiferente,
    BtnGeneral,
    ProductTable,
  },
  props: {
    /* working */
    productList: Array,
    /* testing */
    setListaProductosExterna: Function,
    continuarVista: Function,
    listaProductosInterna: Array,
    setClienteExterno: Function,
    ClienteExterno: Object,
  },
  mounted() {
    this.cantidad = this.$refs.inputCantidad;
    this.codigo = this.$refs.inputCodigo;
  },

  methods: {
    addProduct() {
      fetch("/src/json/productos.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la petición");
          }
          return response.json();
        })
        .then((data) => {
          let product = data[this.codigo.inputText];
          if (product) {
            if (
              this.cantidad.inputText === "" ||
              this.cantidad.inputText === "0"
            ) {
              this.cantidad.inputText = "1";
            }

            const newProduct = {
              codigo: this.codigo.inputText,
              descripcion: product.name,
              cantidad: parseInt(this.cantidad.inputText),
              precio: product.price,
              iva: product.IVA,
              total:
                parseFloat(this.cantidad.inputText) * parseFloat(product.total),
            };
            let productExists = false;
            this.listProductos.forEach((product) => {
              if (product.codigo === newProduct.codigo) {
                product.cantidad += newProduct.cantidad;
                product.total =
                  product.cantidad * (product.precio + product.iva);
                productExists = true;
                return;
              }
            });
            if (!productExists) this.listProductos.push(newProduct);
            /* this.addProductToList(newProduct); */
            /* this.setListaProductosExterna(updatedProductos); */
            this.codigo.inputText = "";
            this.cantidad.inputText = "";
            this.montoTotal = this.listProductos
              .reduce((acc, product) => acc + product.total, 0)
              .toFixed(2);
            this.$emit("updateList", this.listProductos);
          }
        });
    },

    createClient() {
      // Function logic...
    },

    continueToPayment() {
      // Function logic...
    },
    eliminarProducto(codigo) {
      this.listProductos.forEach((product, index) => {
        if (product.codigo === codigo) {
          this.listProductos.splice(index, 1);
          return;
        }
      });
      this.montoTotal = this.listProductos
        .reduce((acc, product) => acc + product.total, 0)
        .toFixed(2);
    },
  },

  setup(props, { emit }) {
    const listProductos = ref(props.productList || []);
    const montoTotal = ref(
      props.productList
        .reduce((acc, product) => acc + product.total, 0)
        .toFixed(2) || "0.00"
    );
    const getIdentificacion = ref("Cedula");
    const getValorIdentificacion = ref(
      props.ClienteExterno
        ? props.ClienteExterno.ci ||
            props.ClienteExterno.pasaporte ||
            props.ClienteExterno.idExtranjera
        : ""
    );
    const getClientes = ref([]);
    const getValorNombre = ref(
      props.ClienteExterno ? props.ClienteExterno.name : ""
    );
    const getValorDireccion = ref(
      props.ClienteExterno ? props.ClienteExterno.direccion : ""
    );
    const getValorRif = ref(
      props.ClienteExterno ? props.ClienteExterno.rif : ""
    );
    const getValorCodigo = ref("");
    const getValorCantidad = ref("");
    const getName = ref("");
    const getDireccion = ref("");
    const getRif = ref("");
    const disabledInput = ref(false);

    const nombreCliente = ref("");
    const direccionCliente = ref("");
    const rifCliente = ref("");
    const tipoDocumentoCliente = ref("");
    const documentoCliente = ref("");

    const handleOnBlur = async (valorDocumento, tipoDocumento) => {
      try {
        const response = await fetch("/src/json/clientes.json");
        const data = await response.json();
        console.log(data);

        console.log("Tipo de documento:", tipoDocumento);

        let clienteEncontrado;
        switch (tipoDocumento) {
          case "Cedula":
            clienteEncontrado = data.data.find(
              (cliente) => cliente.ci === valorDocumento
            );
            break;
          case "Pasaporte":
            clienteEncontrado = data.data.find(
              (cliente) => cliente.pasaporte === valorDocumento
            );
            break;
          case "ID Extranjero":
            clienteEncontrado = data.data.find(
              (cliente) => cliente.idExtranjera === valorDocumento
            );
            break;
          default:
            console.error("Tipo de documento no válido:", tipoDocumento);
            return;
        }

        if (clienteEncontrado) {
          console.log("Datos del cliente encontrado:");
          console.log(clienteEncontrado);
          nombreCliente.value = clienteEncontrado.name;
          direccionCliente.value = clienteEncontrado.direccion;
          rifCliente.value = clienteEncontrado.rif;
          tipoDocumentoCliente.value = tipoDocumento;
          documentoCliente.value = valorDocumento;
        } else {
          console.log("Cliente no encontrado. Permitiendo ingreso manual.");
          disabledInput.value = false;
          nombreCliente.value = "";
          direccionCliente.value = "";
          rifCliente.value = "";
          tipoDocumentoCliente.value = tipoDocumento;
          documentoCliente.value = valorDocumento;
        }

        emit("clienteEncontrado", {
          nombre: nombreCliente.value,
          direccion: direccionCliente.value,
          rif: rifCliente.value,
          tipoDocumentoCliente: tipoDocumentoCliente.value,
          documentoCliente: documentoCliente.value,
        });
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    return {
      listProductos,
      montoTotal,
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
      nombreCliente,
      direccionCliente,
      rifCliente,
      handleOnBlur,
      svgAdd,
      cartSVG,
      svgSearch,
      tipoDocumentoCliente,
      documentoCliente,
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
  width: 100%;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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
