<template>
	<div class="MetodosContainer">
		<h1 class="MetodosHeaderContainer">Agregar métodos de pago</h1>
		<div class="MetodosInput">
			<div class="MetodoMetododPago">
				<InputMetodosPago
					@update-metodo-pago="handleUpdateMetodoPago"
					@update-banco="handleUpdateBanco"
					@update-numero-punto="handleUpdatePunto"
				/>
			</div>
			<div class="MetodoMonto-BotonAgregar">
				<div class="MetodoMonto">
					<InputDiferente name="Monto:" color="#D9D9D9" width="15%" value="" ref="monto" />
				</div>
				<BtnGeneral :img="svgAdd" text="Agregar Pago" width="165px" @click="addMetodoPago" />
			</div>
		</div>

		<div class="MetodosPagoTableContainer">
			<MetodosTable :width="'100%'" :height="'300px'" :color="'#ffffff'" :data="datosMetodosPago" @eliminarPago="eliminarPago" />
		</div>

		<div class="MetodosCheckoutContainer">
			<div style="display: flex; flex-direction: column">
				<p style="position: relative; margin-left: auto; font-size: 18px" class="MetodoTotal">Total:</p>
				<p style="position: relative; margin-left: auto; font-size: 25.4331px; font-weight: bold">$ {{ montoTotal.toFixed(2) }}</p>
			</div>
			<div style="display: flex; flex-direction: column">
				<p style="color: green; position: relative; margin-left: auto; font-size: 18px">Pagado: $ {{ montoPagado }}</p>
				<p style="color: red; position: relative; margin-left: auto; font-size: 18px; font-weight: 'bold'">
					Faltante: $ {{ (montoTotal - montoPagado).toFixed(2) }}
				</p>
			</div>
			<BtnGeneral text="Checkout" width="140px" color="#ff6060" onHoverColor="#c54444" :img="marketCartSVG" @click="checkout" />
		</div>
		<MessageBar v-if="messageVisible" :text="messageText" position="left" severity="warning" :showTime="5000" />
	</div>
</template>

<script>
import InputDiferente from "../../inputs/InputDiferente.vue";
import InputMetodosPago from "../../inputs/InputMetodosPago.vue";
import BtnGeneral from "../../buttons/BtnGeneral.vue";
import MetodosTable from "../../tables/MetodosTable.vue";

import marketCartSVG from "../../../assets/marketKart.svg";
import svgAdd from "../../../assets/svg_add.svg";

import jsPDF from "jspdf";
import MessageBar from "../../messageBar/MessageBar.vue";

export default {
	components: {
		InputMetodosPago,
		InputDiferente,
		BtnGeneral,
		MetodosTable,
		MessageBar,
	},
	props: {
		montoTotal: Number,
		productList: Array,
		cliente: Object,
	},
	mounted() {
		this.monto = this.$refs.monto;
	},
	methods: {
		showMessage(text) {
			this.messageText = text;
			this.messageVisible = true;
			setTimeout(() => {
				this.messageVisible = false;
			}, 5000);
		},
		handleUpdateMetodoPago(valor) {
			this.metodoPago = valor;
		},
		handleUpdateBanco(valor) {
			this.banco = valor;
		},
		handleUpdatePunto(valor) {
			this.numeroPunto = valor;
		},
		addMetodoPago() {
			if (this.metodoPago === "") {
				this.showMessage("Debe seleccionar un metodo de pago");
				return;
			}
			if (this.banco === "") {
				this.showMessage("Debe seleccionar un banco");
				return;
			}
			if (this.monto.inputText === "") {
				this.showMessage("Debe ingresar un monto");
				return;
			}
			if (this.numeroPunto === "" && this.metodoPago === "TARJETA") {
				this.showMessage("Debe ingresar un número de punto");
				return;
			}
			this.datosMetodosPago.push({
				metodosPago: this.metodoPago,
				banco: this.banco,
				monto: this.monto.inputText,
				numeroPunto: this.numeroPunto,
			});
			this.montoPagado = 0;
			this.datosMetodosPago.forEach((pago) => {
				this.montoPagado = (parseFloat(this.montoPagado) + parseFloat(pago.monto)).toFixed(2);
			});
		},
		eliminarPago(index) {
			this.montoPagado = (parseFloat(this.montoPagado) - parseFloat(this.datosMetodosPago[index].monto)).toFixed(2);
			this.datosMetodosPago.splice(index, 1);
		},
		checkout() {
			if (this.montoPagado < this.montoTotal) {
				this.showMessage("El monto pagado es menor al monto total");
				return;
			}
			console.log(this.cliente);
			if (
				this.cliente.nombre === "" ||
				this.cliente.nombre === undefined ||
				this.cliente.documentoCliente === "" ||
				this.cliente.documentoCliente === undefined ||
				this.cliente.direccion === "" ||
				this.cliente.direccion === undefined ||
				this.cliente.rif === "" ||
				this.cliente.rif === undefined ||
				this.cliente.tipoDocumentoCliente === "" ||
				this.cliente.tipoDocumentoCliente === undefined
			) {
				this.showMessage("Datos del cliente incompletos");
				return;
			}
			if (this.productList.length === 0) {
				this.showMessage("No hay productos en la lista");
				return;
			}

			this.showMessage("Compra realizada con éxito");

			this.generarPDF({
				codigoFactura: "123456",
				nombre: this.cliente.nombre,
				tipoIdentificacion: this.cliente.tipoDocumentoCliente.toUpperCase(),
				identificacion: this.cliente.documentoCliente,
				direccion: this.cliente.direccion,
				rif: this.cliente.rif,
			});

			this.$emit("checkout");
		},
		generarPDF({ codigoFactura = "123456", nombre, tipoIdentificacion, identificacion, direccion, rif }) {
			const doc = new jsPDF();
			doc.setFontSize(16);
			doc.setFont("Courier", "bold");
			doc.text("SENIAT", 90, 10);
			doc.setFont("Courier", "normal");
			doc.text("BillMaster. C.A.", 78, 20);
			doc.text("billmaster calle 123", 68, 30);
			doc.text("Tierra Negra, Mcbo, Edo. Zulia", 53, 40);
			doc.setFontSize(13);
			doc.text("RIF: J-123456789", 10, 50);
			doc.text("Fecha: " + new Date().toLocaleDateString(), 10, 60);
			doc.text("COD DE FACTURA: " + codigoFactura, 80, 60);
			doc.text("------------------------ INFORMACION DEL CONSUMIDOR ------------------------", 0, 75);
			doc.text("NOMBRE: " + nombre, 10, 85);
			doc.text(tipoIdentificacion + ": " + identificacion, 10, 95);
			doc.text("DIRECCION: " + direccion, 10, 105);
			doc.text("RIF: " + rif, 10, 115);
			doc.text("--------------------------------- FACTURA ---------------------------------", 0, 130);
			let index = 140;
			let total_preIVA = 0;
			let total_iva = 0;
			this.productList.forEach((producto) => {
				doc.text(`${producto.descripcion}`, 30, index);
				doc.text(`ref. ${producto.precio.toFixed(2)}`, 150, index);
				doc.text(`x${producto.cantidad}`, 185, index);
				index += 10;
				total_preIVA += producto.precio * producto.cantidad;
				total_iva += producto.iva * producto.cantidad;
				if (index > doc.internal.pageSize.height) {
					doc.addPage();
					index = 10;
				}
			});
			const nextText = [
				{
					text: "----------------------------------- TOTAL ----------------------------------",
					x: 0,
				},
				{
					text: `MONTO NETO:                                        ref. ${total_preIVA.toFixed(2)}`,
					x: 10,
				},
				{
					text: `IVA:                                               ref. ${total_iva.toFixed(2)}`,
					x: 10,
				},
				{
					text: `MONTO TOTAL:                                       ref. ${(total_preIVA + total_iva).toFixed(2)}`,
					x: 10,
				},
				{
					text: "----------------------------------------------------------------------------",
					x: 0,
				},

				{ text: "NO. DE DOCUMENTO: 02047411", x: 10 },
				{ text: "GRACIAS POR SU COMPRA", x: 10 },
				{
					text: "----------------------------- BILLMASTER. C.A. -----------------------------",
					x: 0,
				},
				{
					text: "TIENDA: 001                                              CAJA: 001",
					x: 10,
				},
			];
			nextText.forEach((element) => {
				index += 10;
				if (index > doc.internal.pageSize.height) {
					doc.addPage();
					index = 10;
				}
				doc.text(element.text, element.x, index);
			});
			doc.save("factura.pdf");
		},
	},
	data() {
		return {
			montoPagado: "0.00",
			montoFaltante: "0.00",
			metodoPago: "",
			banco: "",
			datosMetodosPago: [],
			messageVisible: false,
			messageText: "",
			numeroPunto: "",
		};
	},
	setup() {
		return {
			marketCartSVG,
			svgAdd,
		};
	},
};
</script>

<style scoped>
.MetodosContainer {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85vh;
	background-color: #ffff;
	position: relative;
}

.MetodosHeaderContainer {
	flex-basis: 10%;
	margin-left: 7%;
	align-items: center;
	display: flex;
}

.MetodosInput {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.MetodoMetododPago {
	margin-left: 10%;
	align-items: center;
	display: flex;
	flex-direction: row;
	gap: 25px;
}

.MetodoMonto-BotonAgregar {
	display: flex;
	flex-direction: column;
	margin-left: 10%;
	gap: 20px;
}

.MetodosPagoTableContainer {
	width: 60%;
	display: flex;
	align-self: center;
	justify-content: center;
	flex-basis: 55%;
}

.MetodosCheckoutContainer {
	align-self: normal;
	flex-basis: 15%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 30px;
	margin-left: auto;
	margin-right: 10%;
}
</style>
