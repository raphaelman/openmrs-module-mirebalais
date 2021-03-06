angular.module("filters", [ "uicommons.filters", "constants" ])

    .filter("byConcept", [function() {
        return function(listOfObs, concept, justOne) {
            var f = justOne ? _.find : _.filter;
            return f(listOfObs, function(candidate) {
                return candidate.concept.uuid === concept.uuid;
            });
        }
    }])

    .filter("groupMember", [function() {
        return function(obs, concept) {
            if (!obs) {
                return null;
            }
            return _.find(obs.groupMembers, function(candidate) {
                return candidate.concept.uuid === concept.uuid;
            });
        }
    }])

    .filter("withCodedMember", [function() {
        return function(listOfObs, concept, codedValue, justOne) {
            var f = justOne ? _.find : _.filter;
            return f(listOfObs, function(candidate) {
                return _.find(candidate.groupMembers, function(member) {
                    return member.concept.uuid == concept.uuid
                        && member.value.uuid == codedValue.uuid;
                });
            });
        }
    }])

    .filter("obs", [ "omrs.displayFilter", function(displayFilter) {
        return function(obs, mode) {
            if (!obs) {
                return "";
            }
            var includeConcept = true;
            if ("value" === mode) {
                includeConcept = false;
            }
            var ret = includeConcept ?
                (displayFilter(obs.concept) + ": ") :
                "";
            if (obs.groupMembers) {
                ret += _.map(obs.groupMembers, function (member) {
                    // return displayFilter(member.valueCodedName ? member.valueCodedName : member.value);
                    return displayFilter(member.value);
                }).join(", ");
            } else {
                ret += displayFilter(obs.value);
            }
            return ret;
        }
    }])

    .filter("diagnosis", [ "omrs.displayFilter", "Concepts", function(displayFilter, Concepts) {
        return function(group) {
            if (!group) {
                return "";
            }
            var coded = _.find(group.groupMembers, function(it) {
                return it.concept.uuid == Concepts.codedDiagnosis.uuid;
            });
            if (coded) {
                // return displayFilter(coded.valueCodedName ? coded.valueCodedName : coded.value);
                return displayFilter(coded.value);
            }

            var nonCoded = _.find(group.groupMembers, function(it) {
                return it.concept.uuid == Concepts.nonCodedDiagnosis.uuid;
            });
            return nonCoded ? nonCoded.value : null;
        }
    }]);