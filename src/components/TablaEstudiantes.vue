<template>
  <div class="tabla">
    <h2>Estudiantes registrados</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha de nacimiento</th>
          <th>Nivel</th>
          <th>Clase</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudiante in estudiantes" :key="estudiante.codigo">
          <td>{{ estudiante.codigo }}</td>
          <td>{{ estudiante.nombre }}</td>
          <td>{{ estudiante.apellido }}</td>
          <td>{{ estudiante.fechaNacimiento || 'Pendiente' }}</td>
          <td>{{ estudiante.nivel || 'Pendiente' }}</td>
          <td>{{ estudiante.clase || 'Pendiente' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TablaEstudiantes',
  data() {
    return {
      estudiantes: []
    }
  },
  mounted() {
    this.listar()
  },
  methods: {
    listar() {
      axios.get('https://enthusiastic-victory-production-0ac7c108.up.railway.app/api/estudiantes/listar')
        .then(Response => {
          this.estudiantes = Response.data;
        })
        .catch(error => {
          console.error("Error al listar los estudiantes", error);
        });
    }
  }
}
</script>