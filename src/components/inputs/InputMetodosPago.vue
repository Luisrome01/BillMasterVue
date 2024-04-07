<template>
	<div :style="containerStyle" class="InputMetodoPagoContainer">
		<div v-for="(item, index) in inputs" :key="index" class="IDIFMainContainer" :style="{ height: height }">
			<p class="IDIFTitle" :style="titleStyle">{{ item.label }}</p>
			<select v-model="item.value" @change="handleChange(index)" class="IDIFSelect" :disabled="shouldDisableSelect(index)">
				<option :value="item.placeholder" hidden>{{ item.placeholder }}</option>
				<option v-for="option in item.options" :key="option.value" :value="option.value">{{ option.label }}</option>
			</select>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		width: String,
		height: String,
		color: String,
		padding: String,
		borderRadius: String,
	},
	data() {
		return {
			inputs: [
				{
					label: "Metodo de Pago:",
					value: "Metodo de Pago",
					placeholder: "Metodo de Pago:",
					options: [
						{ label: "EFECTIVO", value: "EFECTIVO" },
						{ label: "TRANSFERENCIA", value: "TRANSFERENCIA" },
						{ label: "DIVISAS", value: "DIVISAS" },
						{ label: "TARJETA", value: "TARJETA" },
					],
				},
				{
					label: "Banco:",
					value: "",
					placeholder: "Banco:",
					options: [
						{ label: "BANESCO", value: "BANESCO" },
						{ label: "MERCANTIL", value: "MERCANTIL" },
						{ label: "BANCARIBE", value: "BANCARIBE" },
					],
				},
				{
					label: "Numero de Punto:",
					value: "Numero de Punto",
					placeholder: "Numero de Punto:",
					options: [
						{ label: "PUNTO 1", value: "PUNTO 1" },
						{ label: "PUNTO 2", value: "PUNTO 2" },
						{ label: "PUNTO 3", value: "PUNTO 3" },
					],
				},
			],
		};
	},
	computed: {
		containerStyle() {
			return {
				width: this.width,
				height: this.height,
				backgroundColor: this.color,
				padding: this.padding,
				borderRadius: this.borderRadius,
				textAlign: "center",
			};
		},
		titleStyle() {
			return {
				fontWeight: "bold",
			};
		},
	},
	methods: {
		handleChange(index) {
			const item = this.inputs[index];
			if (index === 0) {
				this.$emit("update-metodo-pago", item.value);
				if (item.value === "EFECTIVO" || item.value === "DIVISAS") {
					this.$emit("update-banco", "NO APLICA");
					this.$emit("update-numero-punto", "NO APLICA");
					this.inputs[1].value = "";
				} else if (item.value === "TRANSFERENCIA" || item.value === "TARJETA") {
					this.$emit("update-banco", "");
					if (item.value === "TARJETA") {
						this.$emit("update-numero-punto", "");
					} else {
						this.$emit("update-numero-punto", "NO APLICA");
					}
				}
			} else if (index === 1) {
				this.$emit("update-banco", item.value);
			} else if (index === 2) {
				this.$emit("update-numero-punto", item.value);
			}
		},
		shouldDisableSelect(index) {
			if (index === 1) {
				return this.inputs[0].value === "EFECTIVO" || this.inputs[0].value === "DIVISAS" || this.inputs[0].value === "Metodo de Pago";
			}
			if (index === 2) {
				return (
					this.inputs[0].value === "EFECTIVO" ||
					this.inputs[0].value === "DIVISAS" ||
					this.inputs[0].value === "TRANSFERENCIA" ||
					this.inputs[0].value === "Metodo de Pago" ||
					this.inputs[1].value === "BANCO" ||
					this.inputs[1].value === "Numero de Punto"
				);
			}
		},
	},
};
</script>

<style scoped>
.IDIFMainContainer {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
}

.IDIFSelect {
	margin-left: 10px;
	height: 28px;
	border: 2px solid black;
	border-radius: 10px;
	background-color: #d9d9d9;
	display: flex;
	border: none;
	outline: none;
	text-align: center;
	width: 150px;
	color: black;
}

.IDIFTitle {
	font-weight: bold;
}

.InputMetodoPagoContainer {
	display: flex;
	flex-direction: row;
	gap: 20px;
}
</style>
