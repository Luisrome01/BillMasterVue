<template>
    <div :style="{ flexBasis: flexBasis }" class="InputDContainer">
        <p class="InputDTitle">{{ name }}</p>
        <input :type="type" :placeholder="placeholder" :style="{
        height: height || '32px',
        backgroundColor: color || 'rgba(174, 187, 253, 0.25)',
        borderRadius: borderRadius || '10px',
        boxShadow: shadow,
        width: width || 'auto',
    }" class="InputDiferente" v-model="searchTerm" @input="handleChange" :disabled="disabled" :id="id" />
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String,
        width: String,
        height: String,
        color: String,
        borderRadius: String,
        shadow: String,
        name: String,
        flexBasis: String,
        disabled: Boolean,
        id: String,
    },
    data() {
        return {
            searchTerm: '',
        };
    },
    methods: {
        handleChange(event) {
            this.searchTerm = event.target.value;
        },
    },
};
</script>

<style>
.InputDiferente {
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.25);
    margin-left: 10px;
    color: black;
}

.InputDTitle {
    font-weight: bold;
    font-size: 15.2444px;
}

.InputDContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

input {
    border: none;
    outline: none;
    color: black;
}
</style>
