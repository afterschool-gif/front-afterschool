<template>
  <div class="estudiantes">
    <h1>After School · Registro de estudiantes</h1>
    <FormularioEstudiantes @cambio="$refs.tabla.listar()" />
    <TablaEstudiantes ref="tabla" />
  </div>
</template>

<script>
import FormularioEstudiantes from '@/components/FormularioEstudiantes.vue'
import TablaEstudiantes from '@/components/TablaEstudiantes.vue'

export default {
  name: 'EstudianteView',
  components: {
    FormularioEstudiantes,
    TablaEstudiantes
  }
}
</script>