<template>
	<div class="FacturaContainer">
		<h1 class="FacturaHeaderContainer">Nueva Factura</h1>

		<div class="FacturaInputsEntre2">
			<div class="FacturaInput1">
				<div class="FacturaCedula-nombre">
					<div class="FacturaCedula">
						<InputDinamico
							ref="inputTipoDocumento"
							:value="documentoCliente"
							name="Cedula o Pasaporte:"
							color="#D9D9D9"
							width="200px"
							:onEnter="handleOnBlur"
							@blur="handleOnBlur"
							@onTypeChange="(newType) => setIdentificacion(newType)"
							@onValueChange="(newValue) => setValorIdentificacion(newValue)"
						/>
					</div>

					<div class="FacturaNombre">
						<InputDiferente
							ref="inputNombre"
							:value="nombreCliente"
							name="Nombre:"
							color="#D9D9D9"
							width="50%"
							placeholder="ej. Jhon Doe"
							:disabled="disabledInput"
						/>
					</div>
				</div>
				<div class="FacturaDireccion">
					<InputDiferente
						ref="inputDireccion"
						name="Direccion:"
						:value="direccionCliente"
						flexBasis="100%"
						color="#D9D9D9"
						width="70%"
						placeholder="ej. Avenida Río Caura Torre Humboldt Prados del Este Piso 20 Oficina 20-06"
						:disabled="disabledInput"
					/>
				</div>
				<div class="FacturaRif-BotonCrear">
					<div class="FacturaRif">
						<InputDiferente
							ref="inputRif"
							:value="rifCliente"
							name="Rif:"
							color="#D9D9D9"
							width="80%"
							placeholder="ej. J123456789"
							:disabled="disabledInput"
						/>
					</div>
					<div class="FacturaBotonCrear">
						<BtnGeneral :img="svgAdd" text="Crear Cliente" width="165px" @click="createClient" :disabled="ClientCreated" />
					</div>
				</div>
			</div>

			<div class="FacturaInput2">
				<div class="FacturaoCodigo-buscar">
					<div class="FacturaCodigo">
						<InputDiferente name="Codigo:" color="#D9D9D9" ref="inputCodigo" @keydown.enter="handleEnter" />
					</div>
					<div class="FacturaBuscar">
						<button class="FacturaSearch" @click="handleClickModal">
							<img :src="svgSearch" alt="Buscar" />
						</button>
					</div>
					<ModalBuscar v-if="openModal" :closeModal="handleCloseModal" :agregarProducto="agregarProducto" class="FactModal" />
				</div>
				<div class="FacturaCantidad">
					<InputDiferente
						type="number"
						name="Cantidad:"
						color="#D9D9D9"
						width="80px"
						placeholder="1"
						ref="inputCantidad"
						@keydown.enter="handleEnter"
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
			<div style="display: flex; flex-direction: column">
				<p style="position: relative; margin-left: auto; font-size: 18px">Total:</p>
				<p style="position: relative; margin-left: auto; font-size: 25.4331px; font-weight: bold">$ {{ montoTotal }}</p>
			</div>
			<BtnGeneral
				text="Metodo de Pago"
				width="150px"
				color="#ff6060"
				:img="cartSVG"
				@click="continueToPayment"
				:disabled="!ClientReady || !haveItems"
			/>
		</div>
		<MessageBar v-if="messageVisible" :text="messageText" position="left" severity="warning" :showTime="5000" />
	</div>
</template>

<script>
import InputDinamico from "../../../components/inputs/InputDinamico.vue";
import InputDiferente from "../../../components/inputs/InputDiferente.vue";
import BtnGeneral from "../../../components/buttons/BtnGeneral.vue";
import ProductTable from "../../tables/ProductTable.vue";
import { ref, computed } from "vue";
import svgAdd from "../../../assets/svg_add.svg";
import svgSearch from "../../../assets/SearchSVG.svg";
import cartSVG from "../../../assets/marketKart.svg";
import MessageBar from "../../messageBar/MessageBar.vue";
import ModalBuscar from "../../modals/ModalBuscar.vue";

export default {
	name: "Facturacion",
	components: {
		InputDinamico,
		InputDiferente,
		BtnGeneral,
		ProductTable,
		MessageBar,
		ModalBuscar,
	},
	props: {
		productList: Array,
		cliente: Object,
	},
	data() {
		return {
			messageVisible: false,
			messageText: "",
			openModal: false,
		};
	},
	mounted() {
		this.cantidad = this.$refs.inputCantidad;
		this.codigo = this.$refs.inputCodigo;
		this.nombre = this.$refs.inputNombre;
		this.direccion = this.$refs.inputDireccion;
		this.inputDocumento = this.$refs.inputTipoDocumento;
		this.rif = this.$refs.inputRif;
	},
	methods: {
		handleClickModal() {
			this.openModal = true;
		},
		handleCloseModal() {
			this.openModal = false;
		},
		showMessage(text) {
			this.messageText = text;
			this.messageVisible = true;
			setTimeout(() => {
				this.messageVisible = false;
			}, 5000);
		},
		addProduct() {
			fetch("/src/json/productos.json")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error en la petición");
					}
					return response.json();
				})
				.then((data) => {
					let product = data[this.codigo ? this.codigo.inputText : null];

					if (product) {
						if (this.cantidad.inputText === "" || this.cantidad.inputText === "0") {
							this.cantidad.inputText = "1";
						}

						const newProduct = {
							codigo: this.codigo.inputText,
							descripcion: product.name,
							cantidad: parseInt(this.cantidad.inputText),
							precio: product.price,
							iva: product.IVA,
							total: parseFloat(this.cantidad.inputText) * parseFloat(product.total),
						};
						let productExists = false;
						this.listProductos.forEach((product) => {
							if (product.codigo === newProduct.codigo) {
								product.cantidad += newProduct.cantidad;
								product.total = product.cantidad * (product.precio + product.iva);
								productExists = true;
								return;
							}
						});
						if (!productExists) this.listProductos.push(newProduct);
						this.codigo.inputText = "";
						this.cantidad.inputText = "";
						this.montoTotal = this.listProductos.reduce((acc, product) => acc + product.total, 0).toFixed(2);
						this.$emit("updateList", this.listProductos);
					}
				});
		},
		agregarProducto(producto) {
			const existingProductIndex = this.listProductos.findIndex((p) => p.codigo === producto.codigo);
			if (existingProductIndex !== -1) {
				this.listProductos[existingProductIndex].cantidad += producto.cantidad;
				this.listProductos[existingProductIndex].total += producto.total;
			} else {
				this.listProductos.push(producto);
			}
		},

		createClient() {
			if (
				this.nombre.inputText === "" ||
				this.direccion.inputText === "" ||
				this.rif.inputText === "" ||
				this.inputDocumento.valorDocumento === ""
			) {
				this.showMessage("Datos del cliente incompletos");
				return;
			}
			this.$emit("clienteEncontrado", {
				nombre: this.nombre.inputText,
				direccion: this.direccion.inputText,
				rif: this.rif.inputText,
				documentoCliente: this.inputDocumento.valorDocumento,
				tipoDocumentoCliente: this.inputDocumento.tipoDocumento,
			});
			this.ClientCreated = true;
			this.ClientReady = true;
			console.log("ClientCreated now:", this.ClientCreated);
			console.log("Have items:", this.haveItems);
		},

		continueToPayment() {
			if (this.listProductos.length <= 0) {
				this.showMessage("No hay productos en la factura");
				return;
			}
			if (
				this.nombre.inputText === "" ||
				this.direccion.inputText === "" ||
				this.rif.inputText === "" ||
				this.inputDocumento.valorDocumento === ""
			) {
				this.showMessage("Datos del cliente incompletos");
				return;
			}
			this.$emit("metodo-pago");
		},
		eliminarProducto(codigo) {
			this.listProductos.forEach((product, index) => {
				if (product.codigo === codigo) {
					this.listProductos.splice(index, 1);
					return;
				}
			});
			this.montoTotal = this.listProductos.reduce((acc, product) => acc + product.total, 0).toFixed(2);
		},
		async handleOnBlur(valorDocumento, tipoDocumento) {
			try {
				const response = await fetch("/src/json/clientes.json");
				const data = await response.json();

				let clienteEncontrado;
				switch (tipoDocumento) {
					case "Cedula":
						clienteEncontrado = data.data.find((cliente) => cliente.ci === valorDocumento);
						break;
					case "Pasaporte":
						clienteEncontrado = data.data.find((cliente) => cliente.pasaporte === valorDocumento);
						break;
					case "ID Extranjero":
						clienteEncontrado = data.data.find((cliente) => cliente.idExtranjera === valorDocumento);
						break;
					default:
						console.error("Tipo de documento no válido:", tipoDocumento);
						return;
				}

				if (clienteEncontrado) {
					this.nombreCliente = clienteEncontrado.name;
					this.direccionCliente = clienteEncontrado.direccion;
					this.rifCliente = clienteEncontrado.rif;
					this.tipoDocumentoCliente = tipoDocumento;
					this.documentoCliente = valorDocumento;
					this.disabledInput = true;
					this.ClientCreated = true;
					this.ClientReady = true;
				} else {
					this.disabledInput = false;
					this.nombreCliente = "";
					this.direccionCliente = "";
					this.rifCliente = "";
					this.tipoDocumentoCliente = tipoDocumento;
					this.documentoCliente = valorDocumento;
					this.ClientCreated = false;
				}

				this.$emit("clienteEncontrado", {
					nombre: this.nombreCliente,
					direccion: this.direccionCliente,
					rif: this.rifCliente,
					documentoCliente: this.documentoCliente,
					tipoDocumentoCliente: this.tipoDocumentoCliente,
				});
			} catch (error) {
				console.error("Error al cargar los clientes:", error);
			}
		},
		handleEnter(event) {
			if (event.key === "Enter") {
				this.addProduct();
			}
		},
	},

	setup(props) {
		const listProductos = ref(props.productList || []);
		const montoTotal = ref(props.productList.reduce((acc, product) => acc + product.total, 0).toFixed(2) || "0.00");
		const disabledInput = ref(false);
		const nombreCliente = ref(props.cliente.nombre || "");
		const direccionCliente = ref(props.cliente.direccion || "");
		const rifCliente = ref(props.cliente.rif || "");
		const tipoDocumentoCliente = ref(props.cliente.tipoDocumentoCliente || "");
		const documentoCliente = ref(props.cliente.documentoCliente || "");

		const ClientCreated = ref(true);
		const ClientReady = ref(false);
		const haveItems = computed(() => listProductos.value.length > 0);

		return {
			listProductos,
			montoTotal,
			disabledInput,
			nombreCliente,
			direccionCliente,
			rifCliente,
			svgAdd,
			cartSVG,
			svgSearch,
			tipoDocumentoCliente,
			documentoCliente,
			ClientCreated,
			ClientReady,
			haveItems,
		};
	},
};
</script>

<style scoped>
.FactModal {
	z-index: 100;
}

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
