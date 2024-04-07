<template>
	<div class="containerMain">
		<div class="containerCard">
			<div v-for="(producto, codigo) in rows" :key="codigo" class="card"
				:class="{ clicked: producto.clickAddToCart }" @mouseover="showAddToCart(producto)"
				@mouseleave="hideAddToCart(producto)" @click="addToCart(codigo, producto)">
				<div class="img-card">
					<img :src="producto.img" alt="Imagen del producto" class="imgProduct"
						:class="{ blurred: producto.showAddToCart }" />
					<p class="add-to-cart" v-if="producto.showAddToCart">Agregar al carrito</p>
				</div>
				<div class="info-card">
					<h3 class="product-name">{{ producto.name }}</h3>
					<p class="product-price">Precio: ${{ producto.price }}</p>
				</div>
			</div>
		</div>
		<MessageBar v-if="showMessage" :text="messageText" position="right" severity="success" :showTime="5000" />
	</div>
</template>

<script>
import MessageBar from '../messageBar/MessageBar.vue';

export default {
	components: {
		MessageBar
	},
	props: {
		rows: {
			type: Object,
			required: true,
		},
		cartList: Array,
	},
	data() {
		return {
			showMessage: false,
			messageText: ''
		};
	},
	methods: {
		clickAddToCart(producto) {
			producto.clickAddToCart = true;
			setTimeout(() => {
				producto.clickAddToCart = false;
			}, 100);
		},
		showAddToCart(producto) {
			producto.showAddToCart = true;
		},
		hideAddToCart(producto) {
			producto.showAddToCart = false;
		},
		addToCart(codigo, producto) {
			this.clickAddToCart(producto);
			fetch("/src/json/productos.json")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error en la petición");
					}
					return response.json();
				})
				.then((data) => {
					let product = data[codigo];
					if (product) {
						const newProduct = {
							codigo: codigo,
							descripcion: product.name,
							cantidad: 1,
							precio: product.price,
							iva: product.IVA,
							total: product.total,
						};
						let productExists = false;
						this.cartList.forEach((product) => {
							if (product.codigo === newProduct.codigo) {
								product.cantidad++;
								product.total += newProduct.total;
								productExists = true;
								return;
							}
						});
						if (!productExists) this.cartList.push(newProduct);
						this.$emit("updateList", this.cartList);

						this.showMessage = true;
						this.messageText = `${newProduct.descripcion} agregado al carrito`;
						setTimeout(() => {
							this.showMessage = false;
						}, 3000);
					}
				});
		},
	},
};
</script>

<style scoped>
.containerMain {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85vh;
	background-color: #ffff;
	position: relative;
}

.containerCard {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: 20px;
	margin-left: 3%;
	margin-top: 3%;
}

.card {
	position: relative;
	width: 190px;
	height: 254px;
	background: #fff;
	border: solid 4px #333;
	box-shadow: -5px 5px #333;
	transition: all 0.1s ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
	border-radius: 15px;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.card.clicked {
	margin: 10px 0 0 0;
	box-shadow: 0px 0px #333;
}

.card .img-card {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	font-weight: bold;
}

.card .img-card img {
	max-width: 90%;
	max-height: 90%;
}

.card .info-card {
	height: 50px;
	width: 170px;
	padding: 10px;
	border-top: solid 1px #333;
	margin-top: -1px;
}

.card .info-card h3,
.card .info-card p {
	margin: 0;
}

.imgProduct {
	max-width: 150px;
	max-height: 150px;
	transition: filter 0.3s ease-in-out;
}

.blurred {
	filter: blur(5px);
}

.add-to-cart {
	position: absolute;
	top: -10;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	text-align: center;
	line-height: 250px;
	font-size: 20px;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
}

.card:hover .add-to-cart {
	display: block;
	opacity: 1;
}

.product-name,
.product-price {
	font-size: 14px;
}
</style>
