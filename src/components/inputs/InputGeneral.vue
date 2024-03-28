<template>
    <div>
        <div class="containerName">
            <span>{{ name }}</span>
        </div>
        <input :type="type" :placeholder="placeholder" :style="style" :value="value" @input="handleInput"
            class="InputGeneral" />
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String,
        width: String,
        height: String,
        value: [String, Number],
        onChange: Function,
        color: String,
        borderRadius: String,
        shadow: String,
        name: String,
    },
    methods: {
        handleInput(event) {
            this.onChange(event.target.value);
            this.$emit('change', event.target.value);
        }
    },
    computed: {
        style() {
            return {
                width: this.width,
                height: this.height,
                backgroundColor: this.color,
                borderRadius: this.borderRadius,
                boxShadow: this.shadow,
            };
        },
    },
};
</script>

<style scoped>
span {
    color: black;
    margin-left: 6%;
    font-weight: bold;
}

.containerName {
    width: 90%;
}

input {
    color: black;
    font-weight: bold;
    border: none;
    outline: none;
    padding-left: 10px;
}

.InputGeneral {
    width: 300px;
    height: 50px;
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.25);
    border-radius: 10px;
    border: none;
}

.InputGeneral:focus {
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.75);
}
</style>