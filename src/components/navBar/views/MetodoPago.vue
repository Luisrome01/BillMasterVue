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
			<BtnGeneral text="Checkout" width="140px" color="#ff6060" onHoverColor="#c54444" :img="marketCartSVG" />
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
		},
		eliminarPago(index) {
			this.datosMetodosPago.splice(index, 1);
		},
	},
	data() {
		return {
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
	flex-basis: 50%;
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
