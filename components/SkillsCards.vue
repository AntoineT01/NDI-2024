<template>
  <BaseCards class="skills_cards">
    <slot></slot>
  </BaseCards>
</template>

<style scoped lang="scss">
.skills_cards {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 1.5rem;
  margin-bottom: 15rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    font-size: 1.1rem;
  }
}
</style>
