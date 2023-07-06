import { searchRankingPoint } from '../../app/service/search-ranking.service';

const defaultSearchConfiguration = {
    _searchable: true,
    title: {
        _searchable: true,
        _score: searchRankingPoint.HIGH_SEARCH_RANKING,
    },
};

/**
 * @package content
 */
export default defaultSearchConfiguration;
