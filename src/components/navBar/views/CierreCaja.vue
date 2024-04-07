<template>
	<div class="CierreContainer">
		<h2 class="CierreHeaderContainer">Este proceso cierra la caja del turno asignado:</h2>
		<div class="FacturaTableContainer">
			<CierreCajaTable :data="data" />
		</div>

		<div class="FacturaCheckoutContainer">
			<div style="display: flex; flex-direction: column">
				<p style="position: relative; margin-left: auto; font-size: 18px">Saldo de cierre:</p>
				<p style="position: relative; margin-left: auto; font-size: 25.4331px; font-weight: bold">$ {{ montoTotal }}</p>
			</div>

			<div style="display: flex; flex-direction: column">
				<p style="color: #12b422; position: relative; margin-left: auto; font-size: 18px">Ingresos: $ {{ listIngresos }}</p>
				<p style="color: #eb0000; position: relative; margin-left: auto; font-size: 18px; font-weight: bold">Egresos: $ {{ listEgresos }}</p>
			</div>

			<BtnGeneral text="Cierre de caja" width="140px" color="#ff6060" onHoverColor="#c54444" :img="checkSVG" @click="handleClickCierreCaja" />
		</div>

		<ModalCierre
			v-if="openModal"
			:closeModal="closeModal"
			:cantidadFacturas="cantidadFacturas"
			:ingresos="listIngresos"
			:ingresosEfectivo="ingresosEfectivo"
			:ingresosDivisas="ingresosDivisas"
			:ingresosBanesco="ingresosBanesco"
			:ingresosMercantil="ingresosMercantil"
			:ingresosBancaribe="ingresosBancaribe"
			:ingresosPunto1="ingresosPunto1"
			:ingresosPunto2="ingresosPunto2"
			:ingresosPunto3="ingresosPunto3"
			:egresos="listEgresos"
			:total="montoTotal"
			:responsable="responsableState"
			:fecha="fecha"
			:hora="hora"
		/>
	</div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import BtnGeneral from "../../buttons/BtnGeneral.vue";
import CierreCajaTable from "../../../components/tables/CierreCajaTable.vue";
import ModalCierre from "../../modals/ModalCierreCaja.vue";
import checkSVG from "../../../assets/checkmark.svg";

export default {
	components: {
		BtnGeneral,
		CierreCajaTable,
		ModalCierre,
	},
	setup(props) {
		const montoTotal = ref("0.00");
		const listIngresos = ref([]);
		let ingresosEfectivo = ref(0);
		let ingresosDivisas = ref(0);
		let ingresosBanesco = ref(0);
		let ingresosMercantil = ref(0);
		let ingresosBancaribe = ref(0);
		let ingresosPunto1 = ref(0);
		let ingresosPunto2 = ref(0);
		let ingresosPunto3 = ref(0);
		const listEgresos = ref([]);
		const data = ref([]);
		const openModal = ref(false);
		const cantidadFacturas = ref(0);
		const responsableState = ref(localStorage.getItem("username") || "");
		const fecha = ref("");
		const hora = ref("");

		const setData = (newData) => {
			data.value = newData;
		};

		onMounted(() => {
			fetch("/src/json/facturas.json")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error fetching data");
					}
					return response.json();
				})
				.then((jsonData) => {
					const newData = jsonData.data;
					setData(newData);
					const total = newData.reduce((acc, item) => acc + item.monto, 0);
					const ingresos = jsonData.data.reduce((acc, item) => {
						const metodosPago = item.metodosPago || [];
						metodosPago.forEach((metodo) => {
							switch (metodo.metodo) {
								case "efectivo":
									ingresosEfectivo.value += metodo.monto;
									break;
								case "tarjeta":
									switch (metodo.punto) {
										case 1:
											ingresosPunto1.value += metodo.monto;
											break;
										case 2:
											ingresosPunto2.value += metodo.monto;
											break;
										case 3:
											ingresosPunto3.value += metodo.monto;
											break;
										default:
											break;
									}
									break;
								case "transferencia":
									switch (metodo.banco) {
										case "banesco":
											ingresosBanesco.value += metodo.monto;
											break;
										case "mercantil":
											ingresosMercantil.value += metodo.monto;
											break;
										case "bancaribe":
											ingresosBancaribe.value += metodo.monto;
											break;
										default:
											break;
									}
									break;
								case "divisas":
									ingresosDivisas.value += metodo.monto;
									break;
								default:
									break;
							}
						});
						const ingresosMetodo = metodosPago.reduce((acc, metodo) => acc + (metodo.monto || 0), 0);
						return acc + ingresosMetodo;
					}, 0);
					const egresos = Math.abs(total - ingresos);
					montoTotal.value = total.toFixed(2);
					listIngresos.value = ingresos.toFixed(2);
					listEgresos.value = egresos.toFixed(2);
					cantidadFacturas.value = newData.length;
				})
				.catch((error) => {
					console.error("Error fetching data:", error);
				});
		});

		const handleClickCierreCaja = () => {
			const currentDateTime = new Date();
			const options = {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
				timeZone: "America/Caracas",
			};
			const formattedDate = currentDateTime.toLocaleDateString("es-AR");
			const formattedTime = currentDateTime.toLocaleTimeString("en-US", options);
			fecha.value = formattedDate;
			hora.value = formattedTime;
			openModal.value = true;
		};

		const closeModal = () => {
			const currentDateTime = new Date();
			localStorage.setItem("cajaBloqueada", "true");
			localStorage.setItem("blockedDate", currentDateTime.toLocaleDateString("es-AR"));
		};

		return {
			closeModal,
			montoTotal,
			listIngresos,
			ingresosEfectivo,
			ingresosDivisas,
			ingresosBanesco,
			ingresosMercantil,
			ingresosBancaribe,
			ingresosPunto1,
			ingresosPunto2,
			ingresosPunto3,
			listEgresos,
			data,
			openModal,
			cantidadFacturas,
			responsableState,
			fecha,
			hora,
			handleClickCierreCaja,
			setOpenModal: openModal,
			checkSVG,
		};
	},
};
</script>

<style>
.CierreContainer {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85vh;
	background-color: #ffff;
	position: relative;
	justify-content: center;
}

.CierreHeaderContainer {
	flex-basis: 8%;
	margin-left: 5%;
	align-items: center;
	display: flex;
}

.CierreInput {
	display: flex;
	flex-direction: column;
	/* align-items: flex-start; */
	gap: 20px;
}

.CierreCierredPago {
	align-items: center;
	flex-basis: 33%;
	display: flex;
	flex-direction: row;
}

.CierreCierre {
	margin-left: 10%;
	display: flex;
	gap: 30px;
	flex-direction: column;
}

.CierreBanco {
	flex-basis: 42%;
}

.CierreMonto-BotonAgregar {
	display: flex;
	flex-direction: column;
	gap: 30px;
}

.CierreMonto {
	margin-left: 10%;
	flex-basis: 60%;
}

.CierreBotonAgregar {
	margin-left: 10%;
	flex-basis: 60%;
}

.FacturaTableContainer {
	width: 100%;
	display: flex;
	align-self: center;
	justify-content: center;
	flex-basis: 50%;
	flex-direction: row;
	justify-content: center;
	position: relative;
}

.FacturaCheckoutContainer {
	position: relative;
	align-self: normal;
	flex-basis: 15%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 30px;
	margin-left: auto;
	margin-right: 10%;
	left: 5%;
}

p,
h2 {
	margin: 0;
	padding: 0;
}
</style>
