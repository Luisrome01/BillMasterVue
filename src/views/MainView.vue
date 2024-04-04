<template>
    <div>
        <div class="MainContainer">
            <div class="MainNavContainer">
                <NavBar :componenteActivo="componenteActivo" @update:componenteActivo="actualizarComponenteActivo" />
            </div>
            <div class="MainContentContainer">
                <div class="MainContentTop">
                    <h1 class="MainTitle">{{ componenteActivo }}</h1>
                    <div class="MainUserDiv">
                        <img :src="logo"></img>
                        <p v-if="username">
                            Bienvenido {{ username }}
                        </p>
                        <p v-else>
                            Bienvenido Usuario
                        </p>
                    </div>
                </div>
                <div class="FactContentBottom">
                    <component :is="componenteActivoComponente" @updateList="handleUpdateProductList"
                        :productList="productList" :montoTotal="monto" @checkout="handleCheckout"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/navBar/navBar.vue';
import Facturacion from "../components/navBar/views/Facturacion.vue";
import Productos from "../components/navBar/views/Productos.vue";
import MetodoPago from '../components/navBar/views/MetodoPago.vue';
import CierreCaja from '../components/navBar/views/CierreCaja.vue';
import logo from "../assets/user-round.svg";

export default {
    components: {
        NavBar,
        Facturacion,
        Productos,
        MetodoPago,
        CierreCaja
    },
    data() {
        return {
            componenteActivo: 'Productos',
            logo: logo,
            productList: [],
            username: null,
            monto: 0,
        };
    },
    computed: {
        componenteActivoComponente() {
            const componentes = {
                'Productos': Productos,
                'Facturación': Facturacion,
                'Métodos de Pago': MetodoPago,
                'Cierre de Caja': CierreCaja
            };
            return componentes[this.componenteActivo];
        }
    },
    methods: {
        actualizarComponenteActivo(componente) {
            this.componenteActivo = componente;
        },
        handleUpdateProductList(newList) {
            this.productList = newList;
            this.monto = this.productList.reduce((acc, product) => acc + product.total, 0);
        },
        handleCheckout() {
            this.productList = [];
            this.monto = 0;
            this.actualizarComponenteActivo('Facturación');
        }
    },
    mounted() {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            this.username = storedUsername;
        }
        this.actualizarComponenteActivo('Productos');
    }
};
</script>

<style>
body {
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
    color: black;
}

html {
    height: 100%;
}

.MainContainer {
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
}

.MainNavContainer {
    flex-basis: 22.5%;
    border-right: 2px solid #ebebeb;
}

.MainContentContainer {
    flex-basis: 77.5%;
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 100vh;
    border-radius: 20px;
    background-color: #f5f5f5;
}

.MainContentTop {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 25px;
    flex-basis: 15%;
    position: relative;
}

.MainContentTop::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 5px;
    background-image: linear-gradient(to right, #aebbfd, #ff6060);
    background-repeat: no-repeat;
    border-radius: 5px;
}

.MainContentBottom {
    flex-basis: 85%;
    background-color: #ffffff;
}

.MainTitle {
    color: black;
    font-weight: bold;
    flex-basis: 70%;
    margin-left: 5%;
}

.MainUserDiv {
    flex-basis: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    background-color: #aebbfd;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 1);
}

.MainUserDiv img {
    margin: 0 10px;
}

.MainUserDiv p {
    flex-grow: 1;
    text-align: center;
    margin-right: 10px;
}
</style>
