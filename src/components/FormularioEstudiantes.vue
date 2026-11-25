<template>
  <div class="formulario">
    <h2>Formulario del profesorado</h2>

    <div class="campos">
      <label>Código
        <input type="number" v-model="codigo">
      </label>
      <label>Nombre
        <input type="text" v-model="nombre">
      </label>
      <label>Apellido
        <input type="text" v-model="apellido">
      </label>
      <label>Fecha de nacimiento
        <input type="date" v-model="fechaNacimiento">
      </label>
      <label>Nivel
        <select v-model="nivel">
          <option value="">-- Elegir --</option>
          <option>Basico</option>
          <option>Intermedio</option>
          <option>Avanzado</option>
        </select>
      </label>
      <label>Clase
        <select v-model="clase">
          <option value="">-- Elegir --</option>
          <option>Ingles conversacional</option>
          <option>Refuerzo escolar bilingue</option>
          <option>Ingles en situaciones cotidianas</option>
        </select>
      </label>
    </div>

    <div class="botones">
      <button @click="guardar">Guardar</button>
      <button @click="consultar">Consultar</button>
      <button @click="actualizar">Actualizar</button>
      <button @click="eliminar">Eliminar</button>
    </div>

    <p class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormularioEstudiantes',
  emits: ['cambio'],
  data() {
    return {
      codigo: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      nivel: '',
      clase: '',
      mensaje: ''
    }
  },
  methods: {
    guardar() {
      axios.post('https://enthusiastic-victory-production-0ac7c108.up.railway.app/api/estudiantes', {
        codigo: this.codigo,
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento || null,
        nivel: this.nivel || null,
        clase: this.clase || null
      })
        .then(Response => {
          console.log("Estudiante guardado con éxito", Response.data);
          this.mensaje = "Estudiante guardado con éxito";
          this.limpiar();
          this.$emit('cambio');
        })
        .catch(error => {
          console.error("Error al guardar el estudiante", error);
          this.mensaje = "Error al guardar";
        });
    },

    consultar() {
      axios.get('https://enthusiastic-victory-production-0ac7c108.up.railway.app/api/estudiantes/' + this.codigo)
        .then(Response => {
          if (Response.data) {
            this.nombre = Response.data.nombre;
            this.apellido = Response.data.apellido;
            this.fechaNacimiento = Response.data.fechaNacimiento || '';
            this.nivel = Response.data.nivel || '';
            this.clase = Response.data.clase || '';
            this.mensaje = "Estudiante encontrado: completa o corrige sus datos";
          } else {
            this.mensaje = "No existe un estudiante con ese código";
          }
        })
        .catch(error => {
          console.error("Error al consultar el estudiante", error);
          this.mensaje = "Error al consultar";
        });
    },

    actualizar() {
      axios.put('https://enthusiastic-victory-production-0ac7c108.up.railway.app/api/estudiantes/actualizar/' + this.codigo, {
        codigo: this.codigo,
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento || null,
        nivel: this.nivel || null,
        clase: this.clase || null
      })
        .then(Response => {
          console.log("Estudiante actualizado con éxito", Response.data);
          this.mensaje = "Estudiante actualizado con éxito";
          this.limpiar();
          this.$emit('cambio');
        })
        .catch(error => {
          console.error("Error al actualizar", error);
          this.mensaje = "Error al actualizar";
        });
    },

    eliminar() {
      axios.delete('https://enthusiastic-victory-production-0ac7c108.up.railway.app/api/estudiantes/' + this.codigo)
        .then(() => {
          console.log("Estudiante eliminado con éxito");
          this.mensaje = "Estudiante eliminado";
          this.limpiar();
          this.$emit('cambio');
        })
        .catch(error => {
          console.error("Error al eliminar", error);
          this.mensaje = "Error al eliminar";
        });
    },

    limpiar() {
      this.codigo = '';
      this.nombre = '';
      this.apellido = '';
      this.fechaNacimiento = '';
      this.nivel = '';
      this.clase = '';
    }
  }
}
</script>