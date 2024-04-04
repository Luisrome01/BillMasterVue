<template>
	<div :style="containerStyle" class="MetodosTableContainer">
		<div class="MetodosTableWrapper">
			<div class="MetodosTableHeader">
				<p>Metodo de Pago</p>
				<p>Banco</p>
				<p>Monto</p>
				<p></p>
			</div>
			<div class="MetodosTableBody">
				<div v-for="(fila, index) in data" :key="index" class="MetodosTableRow">
					<p>{{ fila.metodosPago }}</p>
					<p>{{ fila.banco }}</p>
					<p>{{ fila.monto }}</p>
					<button @click="eliminarPago(index)" class="MetodosTrashButton">
						<img src="../../assets/trashbin.svg" alt="Eliminar pago" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		width: String,
		height: String,
		color: String,
		data: Array,
	},

	computed: {
		containerStyle() {
			return {
				width: this.width || "90%",
				height: this.height || "85%",
				backgroundColor: this.color || "#ffffff",
			};
		},
	},
	methods: {
		eliminarPago(index) {
			this.$emit("eliminarPago", index);
		},
	},
};
</script>

<style scoped>
.MetodosTableContainer {
	align-self: center;
	border: 1.42917px solid #000000;
	box-sizing: border-box;
	box-shadow: 3.81111px 5.71667px 0px #000000;
	border-radius: 22.8667px;
	width: 10%;
	background-color: red;
}

.MetodosTableWrapper {
	display: flex;
	flex-direction: column;
	height: 35vh;
}

.MetodosTableHeader {
	display: grid;
	align-items: center;
	justify-items: center;
	grid-template-columns: repeat(4, 1fr);
	padding: 15px;
	padding-right: 25px;
	background-color: #d6d6d6;
	border-radius: 22.8667px 22.8667px 0px 0px;
}

.MetodosTableBody {
	display: flex;
	justify-items: center;
	flex-direction: column;
	overflow-y: auto;
	height: 100%;
	width: 100%;
}

.MetodosTableRow {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	padding-left: 15px;
	padding-right: 25px;
	align-items: center;
	justify-items: left;
	margin-top: 25px;
}

.MetodosTableHeader p {
	font-size: 15px;
	font-family: "SF Pro Display Bold", sans-serif;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 8px;
}

.MetodosTableRow p {
	font-size: 15px;
}

.MetodosTrashButton {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	border: none;
	cursor: pointer;
}

.MetodosTableBody::-webkit-scrollbar {
	width: 6px;
	background-color: #f5f5f5;
}

.MetodosTableBody::-webkit-scrollbar-thumb {
	background-color: #888;
	border-radius: 3px;
}

.MetodosTableBody::-webkit-scrollbar-thumb:hover {
	background-color: #555;
}

.MetodosTableBody::-webkit-scrollbar-track {
	background-color: #dadada;
	border-radius: 3px;
}

.MetodosTableBody::-webkit-scrollbar-track:hover {
	background-color: #f1f1f1;
}
</style>
