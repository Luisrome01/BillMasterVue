<template>
	<div>
		<ProductCards :rows="listaProductos" @updateList="updateList" :cartList="productList" />
	</div>
</template>

<script>
import ProductCards from "../../../components/containers/products.vue";
import productos from "../../../json/productos.json";

export default {
	components: {
		ProductCards,
	},
	props: {
		productList: Array,
	},
	methods: {
		updateList(newList) {
			this.$emit("updateList", newList);
		},
	},
	data() {
		return {
			listaProductos: productos,
		};
	},
};
</script>

<style>
h1 {
	color: black;
}
</style>
