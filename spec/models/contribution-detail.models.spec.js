describe('ContributionDetail model', function() {
  var models = window.c.models;

  beforeAll(function(){
    this.contribution_mock = ContributionDetailMockery(1)[0];
    spyOn(m.postgrest, "requestWithToken");
  });

  describe('when instantiated', function() {
    beforeAll(function() {
      this.contribution = new models.contributionDetail(this.contribution_mock);
    });

    it('should exhibit attributes', function() {
      expect(this.contribution).toMatchPropertiesOf(this.contribution_mock);
    });
  });
});
