<template>
  <v-dialog v-model="showModal" max-width="850px" :attach="attach" persistent>
    <v-card class="pa-4">
      <sbc-authentication-options :is-dialog="true" :redirect-url="redirectUrl" @close="emitClose()"/>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Emit } from 'vue-property-decorator'
import { IdpHint, LoginSource, Pages } from '../util/constants'
import NavigationMixin from '../mixins/navigation-mixin'
import SbcAuthenticationOptions from './SbcAuthenticationOptions.vue'

@Component({
  components: {
    SbcAuthenticationOptions
  }
})
export default class SbcAuthenticationOptionsDialog extends NavigationMixin {
  @Prop({ default: false }) inAuth!: boolean
  @Prop({ default: false }) showModal!: boolean
  @Prop({ default: '' }) attach!: string
  @Prop({ default: '' }) redirectUrl!: string

  private authOptions = [
    {
      type: LoginSource.BCSC,
      title: 'BC Services Card',
      description: `Residents of British Columbia can use their government-issued
          BC Services Card to securely access their BC Registries account.`,
      icon: 'mdi-account-card-details-outline',
      btnLabel: 'Log in with BC Services Card',
      idpHint: IdpHint.BCSC
    },
    {
      type: LoginSource.BCEID,
      title: 'BCeID',
      description: `Non-BC residents and BC residents do not have a BC Services Card
          can use a BCeID to securely access their BC Registries account.`,
      icon: 'mdi-two-factor-authentication',
      btnLabel: 'Log in with BCeID',
      idpHint: IdpHint.BCEID
    }
  ]

  private selectAuthType (authOption) {
    let signinRoute = `${Pages.SIGNIN}/${authOption.idpHint}`
    if (this.redirectUrl?.trim()) {
      signinRoute += `/${encodeURIComponent(this.redirectUrl.trim())}`
    }
    this.redirectInTriggeredApp(signinRoute)
  }

  private goToCreateAccount () {
    this.redirectToPath(this.inAuth, Pages.CHOOSE_AUTH_METHOD)
  }

  /**
   * Emits an event to the parent to close.
   */
  @Emit('close')
  private emitClose (): void {}
}
</script>

<style lang="scss" scoped>
  .v-dialog > .v-card {
    border-radius: 4px!important;
  }

  .account-card {
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all ease-out 0.2s;
    min-width: 350px;

    &:hover {
      border-color: var(--v-primary-base) !important;
    }
  }

  .theme--light.v-card.v-card--outlined.active {
    border-color: var(--v-primary-base);
  }

  .account-card .v-icon {
    color: var(--v-primary-base) !important;
    font-size: 3rem !important;
  }

  .account-type {
    flex: 1 1 auto;
  }

  .account-type__icon {
    flex: 0 0 auto;
  }

  .account-type__title {
    flex: 0 0 auto;
    line-height: 1.75rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .account-type__details {
    flex: 1 1 auto;
  }
</style>
