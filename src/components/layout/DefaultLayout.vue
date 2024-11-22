<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <div class="w-full flex-grow bg-gray-100 px-4 py-6">
      <MembershipStatus
        :points="105"
        membershipLevel="SILVER"
        :progress="25"
        :pointsToNext="15"
      />
      <TukarPoin :rewards="rewards" />
      <ExclusiveOffers :offers="offers" />
      <News :newsList="newsList" />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/Header.vue';
import MembershipStatus from '@/components/layout/MembershipStatusLayout.vue';
import TukarPoin from '@/components/layout/ExchangePointLayout.vue';
import ExclusiveOffers from '@/components/layout/ExclusiveOfferLayout.vue';
import News from '@/components/layout/NewsLayout.vue';
import AppFooter from '@/components/layout/Footer.vue';
export default {
  components: {
    AppHeader,
    MembershipStatus,
    TukarPoin,
    ExclusiveOffers,
    News,
    AppFooter
  },
  
  data() {
    return {
      rewards: [
        { id: 1, name: '[Nama Reward]', description: '[Description]', points: 120 },
        { id: 2, name: '[Nama Reward]', description: '[Description]', points: 120 },
      ],
      offers: [
        { id: 1, name: 'Lorem Ipsum' },
        { id: 2, name: 'Dolor Sit' },
        { id: 3, name: 'Amet Consectetur' },
      ],
      newsList: [
        { id: 1, title: 'Breaking News', summary: 'Lorem ipsum dolor sit amet.' },
        { id: 2, title: 'Update News', summary: 'Consectetur adipiscing elit.' },
      ],
    };
  },
};
</script>
