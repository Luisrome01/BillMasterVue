<template>
    <div :style="style" class="SearchTableContainer">
        <div class="SearchTableWrapper">
            <div class="SearchTableHeader">
                <p></p>
                <p style="justify-self: center">Código del producto</p>
                <p>Descripción</p>
                <p>Precio/Unidad</p>
                <p></p>
            </div>
            <div class="SearchTableBody">
                <div v-for="producto in rows" :key="producto.id" class="SearchTableRow">
                    <button @click="agregarProductoLocal(producto)"
                        style="justify-self: center; border: none; background-color: transparent;">
                        <img :src="addSVG" alt="Add" />
                    </button>
                    <p style="justify-self: center">{{ producto.id }}</p>
                    <p>{{ producto.name }}</p>
                    <p>$ {{ producto.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import addSVG from "../../assets/svg_add.svg";

export default {
    props: {
        width: {
            type: String,
            default: "90%"
        },
        height: {
            type: String,
            default: "85%"
        },
        color: {
            type: String,
            default: "#ffffff"
        },
        rows: {
            type: Array,
            required: true
        },
        agregarProducto: {
            type: Function,
            required: true
        },
        closeModal: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            addSVG: addSVG
        };
    },
    computed: {
        style() {
            return {
                width: this.width,
                height: this.height,
                backgroundColor: this.color
            };
        }
    },
    methods: {
        agregarProductoLocal(producto) {
            const productoConDetalles = {
                ...producto,
                codigo: producto.id,
                descripcion: producto.name,
                cantidad: 1,
                precio: producto.price,
                iva: producto.IVA,
                total: producto.total
            };
            this.agregarProducto(productoConDetalles);
            this.closeModal();
        }
    }
};
</script>

<style scoped>
.SearchTableContainer {
	align-self: center;
	border: 1.42917px solid #000000;
	box-sizing: border-box;
	box-shadow: 3.81111px 5.71667px 0px #000000;
	border-radius: 22.8667px;
}

.SearchTableWrapper {
	display: flex;
	flex-direction: column;
	height: 38vh;
}

.SearchTableHeader {
	display: grid;
	align-items: center;
	justify-items: center;
	grid-template-columns: 0.5fr 1fr 1fr 1fr;
	padding: 15px;
	padding-right: 25px;
	background-color: #d6d6d6;
	border-radius: 22.8667px 22.8667px 0px 0px;
}

.SearchTableBody {
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: 74%;
	margin-right: 10px;
}

.SearchTableRow {
	display: grid;
	grid-template-columns: 0.5fr 1fr 1fr 1fr;
	align-items: center;
	justify-items: center;
	margin-top: 25px;
}

.SearchTableHeader p {
	font-size: 15px;
	font-weight: bold;
}

.SearchTableRow p {
	font-size: 15px;
}

.SearchTableBody::-webkit-scrollbar {
	width: 6px;
	background-color: #f5f5f5;
}

.SearchTableBody::-webkit-scrollbar-thumb {
	background-color: #888;
	border-radius: 3px;
}

.SearchTableBody::-webkit-scrollbar-thumb:hover {
	background-color: #555;
}

.SearchTableBody::-webkit-scrollbar-track {
	background-color: #dadada;
	border-radius: 3px;
}

.SearchTableBody::-webkit-scrollbar-track:hover {
	background-color: #f1f1f1;
}
</style>