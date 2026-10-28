import { test } from '../fixtures/auth.fiixture';
import { NavigationSidebarPage } from '../pages/NavigationSidebarPage';
import { TestData } from '../utils/testData';

const {
  items: navigationItems,
  destinations,
  searchQueries,
  noMatchQuery,
  filteredQuery,
  deletedCharacterQuery,
  expectedSearchResult,
  primaryItem,
  dashboardItem,
  endpointItems,
  emptyQuery,
} = TestData.navigationSidebar;
const sidebarDestinations: Record<string, RegExp> = destinations;
const dashboardUrl = destinations.Dashboard;

let sidebar: NavigationSidebarPage;

test.describe('SCRUM-19: Left navigation sidebar @SCRUM-19', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    sidebar = new NavigationSidebarPage(authenticatedPage);
    await sidebar.expectAvailable();
  });

  test('TC-SCRUM-19-01 displays the complete sidebar on Dashboard @SCRUM-19 @TC-SCRUM-19-01 @P1 @smoke @regression', async () => {
    await sidebar.expectExpanded();
    await sidebar.expectLogoVisible();
    await sidebar.expectNavigationOrder(endpointItems);
    await sidebar.expectMainContentUsable();
  });

  test('TC-SCRUM-19-02 displays navigation items in the required order @SCRUM-19 @TC-SCRUM-19-02 @P1 @regression', async () => {
    await sidebar.expectNavigationOrder(navigationItems);
    await sidebar.expectNavigationLabels(navigationItems);
    await sidebar.expectSearchEditable();
  });

  for (const item of navigationItems) {
    test(`TC-SCRUM-19-03 navigates to ${item} from the sidebar @SCRUM-19 @TC-SCRUM-19-03 @P1 @regression`, async () => {
      await sidebar.navigateTo(item);
      await sidebar.expectUrl(sidebarDestinations[item]);
      if (item !== 'Maintenance') {
        await sidebar.expectActive(item);
      }
    });
  }

  test('TC-SCRUM-19-04 identifies Dashboard as active @SCRUM-19 @TC-SCRUM-19-04 @P1 @smoke', async () => {
    await sidebar.expectUrl(dashboardUrl);
    await sidebar.expectActive(dashboardItem);
  });

  test('TC-SCRUM-19-05 synchronizes active navigation with the displayed page @SCRUM-19 @TC-SCRUM-19-05 @P1 @regression', async () => {
    await sidebar.navigateTo(primaryItem);
    await sidebar.expectUrl(sidebarDestinations[primaryItem]);
    await sidebar.expectActive(primaryItem);
  });

  test('TC-SCRUM-19-06 collapses and expands the sidebar @SCRUM-19 @TC-SCRUM-19-06 @P1 @suggestion @regression', async () => {
    await sidebar.expectExpanded();
    await sidebar.collapse();
    await sidebar.expectCollapsed();
    await sidebar.expectMainContentUsable();

    await sidebar.expand();
    await sidebar.expectExpanded();
    await sidebar.expectMainContentUsable();
  });

  for (const query of searchQueries) {
    test(`TC-SCRUM-19-07 searches for ${query} and reflects the latest input @SCRUM-19 @TC-SCRUM-19-07 @P1 @suggestion @regression`, async () => {
      await sidebar.search(query);
      await sidebar.expectSearchValue(query);
      await sidebar.expectNavigationOrder(expectedSearchResult);
    });
  }

  test('TC-SCRUM-19-08 displays no navigation item for an unmatched search @SCRUM-19 @TC-SCRUM-19-08 @P2 @suggestion @regression', async () => {
    await sidebar.search(noMatchQuery);
    await sidebar.expectNoNavigationItems();
  });

  test('TC-SCRUM-19-09 clears search and restores all navigation items @SCRUM-19 @TC-SCRUM-19-09 @P1 @suggestion @regression', async () => {
    await sidebar.search(filteredQuery);
    await sidebar.expectSearchValue(filteredQuery);
    await sidebar.clearSearch();
    await sidebar.expectSearchValue(emptyQuery);
    await sidebar.expectNavigationOrder(navigationItems);
  });

  test('TC-SCRUM-19-10 continues searching after deleting characters @SCRUM-19 @TC-SCRUM-19-10 @P2 @suggestion @regression', async () => {
    await sidebar.search(filteredQuery);
    await sidebar.expectSearchValue(filteredQuery);
    await sidebar.search(deletedCharacterQuery);
    await sidebar.expectSearchValue(deletedCharacterQuery);
    await sidebar.expectNavigationOrder(expectedSearchResult);
    await sidebar.expectSearchEditable();
  });
});
