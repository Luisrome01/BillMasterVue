<template>
	<div class="MetodosContainer">
		<h1 class="MetodosHeaderContainer">Agregar metodos de pago</h1>
		<div class="MetodosInput">
			<div class="MetodoMetododPago">
				<inputMetodosPago @update-metodo-pago="handleUpdateMetodoPago" @update-banco="handleUpdateBanco" />
			</div>
			<div class="MetodoMonto-BotonAgregar">
				<div class="MetodoMonto">
					<InputDiferente name="Monto:" color="#D9D9D9" width="15%" value="" ref="monto" />
				</div>
				<div class="MetodoBotonAgregar">
					<BtnGeneral :img="svgAdd" text="Agregar Pago" width="165px" @click="addMetodoPago" />
				</div>
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
	</div>
</template>
<script>
import InputDiferente from "../../inputs/InputDiferente.vue";
import InputMetodosPago from "../../inputs/InputMetodosPago.vue";
import BtnGeneral from "../../buttons/BtnGeneral.vue";
import MetodosTable from "../../tables/MetodosTable.vue";

import marketCartSVG from "../../../assets/marketKart.svg";
import svgAdd from "../../../assets/svg_add.svg";

export default {
	components: {
		InputMetodosPago,
		InputDiferente,
		BtnGeneral,
		MetodosTable,
	},
	props: {
		montoTotal: Number,
	},
	mounted() {
		this.monto = this.$refs.monto;
	},
	methods: {
		handleUpdateMetodoPago(valor) {
			this.metodoPago = valor;
		},
		handleUpdateBanco(valor) {
			this.banco = valor;
		},
		addMetodoPago() {
			if (this.metodoPago === "") {
				alert("Debe seleccionar un metodo de pago");
				return;
			}
			if (this.banco === "") {
				alert("Debe seleccionar un banco");
				return;
			}
			if (this.monto.inputText === "") {
				alert("Debe ingresar un monto");
				return;
			}
			this.datosMetodosPago.push({ metodosPago: this.metodoPago, banco: this.banco, monto: this.monto.inputText });
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
				alert("El monto pagado es menor al monto total");
				return;
			}
			alert("Compra realizada con exito");
			this.$emit("checkout");
		},
	},
	data() {
		return {
			montoPagado: "0.00",
			montoFaltante: "0.00",
			metodoPago: "",
			banco: "",
			datosMetodosPago: [],
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
