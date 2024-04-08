<template>
    <div class="modalBuscarContainer">
        <div class="modalBuscarBackgroundBlur"></div>
        <div class="modalBuscarContent">
            <div class="modalHeader">
                <div class="spacer"></div>
                <BtnGeneral gap="0" text="X" width="40px" height="40px" color="#FF6060" bgColor="#FF0000"
                    @click="closeModal(false)" />
            </div>
            <div class="modalBody">
                <div class="modalBodyContainer">
                    <div class="modalSearchContainer">
                        <p class="searchTitle">Nombre del producto:</p>
                        <InputBusqueda width="250px" height="40px" color="#D9D9D9" placeholder="Buscar producto"
                            :value="searchTerm" @input="handleSearchChange" />
                    </div>
                    <BuscarProductoTable width="90%" height="85%" :rows="filteredData"
                        :agregarProducto="agregarProducto" :closeModal="closeModal" />
                    <div class="spacer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BtnGeneral from "../buttons/BtnGeneral.vue";
import BuscarProductoTable from "../tables/BuscarProductoTable.vue";
import InputBusqueda from "../inputs/InputBusqueda.vue";
import productosData from "../../json/productos.json";

export default {
    components: {
        BtnGeneral,
        BuscarProductoTable,
        InputBusqueda,
    },
    props: {
        closeModal: {
            type: Function,
            required: true
        },
        agregarProducto: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            data: [],
            searchTerm: ''
        };
    },
    computed: {
        filteredData() {
            return this.data.filter(producto =>
                producto.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    created() {
        const formattedData = Object.keys(productosData).map((id) => ({
            id: id,
            name: productosData[id].name,
            ...productosData[id],
        }));
        this.data = formattedData;
    },
    methods: {
        handleSearchChange(event) {
            this.searchTerm = event.target.value;
        },
    },
};
</script>

<style scoped>
@font-face {
    font-family: "SF Pro Display Bold";
    src: url("./assets/fonts/sf-pro-display-bold.OTF") format("opentype");
}

.modalBuscarContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modalBuscarBackgroundBlur {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    z-index: 1;
}

.modalBuscarContent {
    position: relative;
    z-index: 2;
    background-color: white;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 25px;
}

/* .modalBuscarColor {
    width: 100vw;
    height: 100vh;
    background-color: rgba(200, 200, 200);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  } */

.modalHeader {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 10px;
}

.spacer {
    flex: 1;
}

.BtnGeneral {
    align-self: flex-end;
}

.modalBodyContainer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 20px;
    align-items: center;
}

.modalSearchContainer {
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2%;
}

.searchTitle {
    font-weight: bold;
    font-size: 15.2444px;
}

.productSearch {
    background-color: transparent;
    border: none;
}
</style>