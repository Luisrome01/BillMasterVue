<template>
	<div class="LogContainerGeneral">
		<div class="LogContainer">
			<div class="LogSubContainer">
				<div class="LogContainerTitle">
					<h3 class="LogTitle">Bill Master</h3>
				</div>

				<div class="LogContainerSubTitle">
					<p class="LogEnum">Bienvenido</p>
					<h1 class="LogSubTitle">Iniciar Sesión</h1>
				</div>

				<InputGeneral
					name="Correo Electrónico"
					type="text"
					placeholder="ej. JubertPerez@gmail.com"
					width="80%"
					:value="email"
					@change="updateEmail"
				/>

				<InputGeneral name="Contraseña" type="password" placeholder="Contraseña" width="80%" :value="password" @change="updatePassword" />

				<p v-if="error" id="p-error" style="color: red">{{ error }}</p>
				<BtnGeneral text="Ingresar" @click="handleLogin" :img="image" />
			</div>
		</div>
		<img :src="page" alt="imagen" class="LogImage" />
	</div>
</template>

<script>
import usuarios from "../json/usuarios.json";
import BtnGeneral from "../components/buttons/BtnGeneral.vue";
import InputGeneral from "../components/inputs/InputGeneral.vue";
import image from "../assets/tabler_login.svg";
import page from "../assets/Group2015.svg";

export default {
	data() {
		return {
			email: "",
			password: "",
			error: "",
			image: image,
			page: page,
		};
	},
	methods: {
		updateEmail(value) {
			this.email = value;
		},
		updatePassword(value) {
			this.password = value;
		},
		handleLogin() {
			this.error = "";

			if (localStorage.getItem("cajaBloqueada")) {
				const currentDate = new Date();
				if (localStorage.getItem("blockedDate") === currentDate.toLocaleDateString("es-AR")) {
					this.error = `La caja está bloqueada, se desbloquea el dia ${currentDate.getDate() + 1}/${
						currentDate.getMonth() + 1
					}/${currentDate.getFullYear()} a las 06:00.`;
					return;
				} else {
					const currentDate = new Date();
					if (currentDate.getHours() < 6) {
						this.error = `La caja está bloqueada, se desbloquea el dia ${currentDate.getDate()}/${
							currentDate.getMonth() + 1
						}/${currentDate.getFullYear()} a las 06:00.`;
						return;
					}
					localStorage.removeItem("cajaBloqueada");
					localStorage.removeItem("blockedDate");
				}
			}

			if (!this.email || !this.password) {
				this.error = "Por favor ingresa correo electrónico y contraseña.";
				return;
			}

			const user = usuarios.data.find((user) => user.email === this.email && user.pass === this.password);

			if (!user) {
				this.error = "Correo electrónico o contraseña incorrectos.";
				return;
			}

			localStorage.setItem("username", user.name);

			this.$router.push("/main");
		},
		handleEnter(event) {
			if (event.key === "Enter") {
				this.handleLogin();
			}
		},
	},
	mounted() {
		document.addEventListener("keypress", this.handleEnter);
	},
	beforeDestroy() {
		document.removeEventListener("keypress", this.handleEnter);
	},
	components: {
		BtnGeneral,
		InputGeneral,
	},
};
</script>

<style scoped>
.LogContainerGeneral {
	background-color: #c0cbff;
	width: 100%;
}

.LogContainer {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 60%;
	height: 100vh;
	background: #f3f6fe;
	box-shadow: 0px 19px 40px rgba(0, 0, 0, 0.05);
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
}

.LogSubContainer {
	align-self: center;
	flex-basis: 60%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
	height: 80%;
	gap: 20px;
	box-shadow: 0px 19px 40px rgba(179, 37, 37, 0.05);
	border-radius: 20px;
}

.LogContainerTitle {
	width: 80%;
}

.LogTitle {
	font-size: 30px;
	font-weight: bold;
	color: #8599ff;
	margin: 0;
}

.LogContainerSubTitle {
	width: 80%;
}

.LogEnum {
	font-size: 16px;
	font-weight: bold;
	color: #808080;
	margin: 0;
}

.LogSubTitle {
	font-size: 35px;
	font-weight: bold;
	color: #8599ff;
	margin: 0;
}

.LogLink {
	font-size: 16px;
	font-weight: bold;
	color: #8599ff;
	text-decoration: none;
}

.LogImgContainer {
	flex-basis: 50%;
	width: 100%;
	height: 100%;
	background-color: #c0cbff;
}

.LogImage {
	position: absolute;
	left: 52%;
	bottom: 10%;
}

.input-margin {
	margin-bottom: 10px;
}

#p-error {
	margin: 0;
	text-align: center;
}
</style>
