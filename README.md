# Sports-Backend

A backend application which has the following features:
1) An endpoint which return all the matches for a given tour name in paginated fashion.
2) An endpoint which return all the matches for a given sport's tour along with its format & match's start time.
3) An endpoint to create a news for a tour/match.<br/>
	a) An endpoint to fetch all the news associated with a match id.
	b) An endpoint to fetch all the news associated with a tour id.
	c) An endpoint to fetch all the news associated with a sport id.
## Setup

### Prequisites : 
Docker(Docker desktop for [mac with apple silicon](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-arm64) | [mac with intel chilp](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-amd64) | [mac with windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe) ) and docker-compose.

### Steps :

1. Clone this repository with command `git clone https://github.com/shushriya06/Sports-backend.git`
2. Change working directory to Sports-Backend using `cd Sports-Backend`
3. To start the service, run the following command from this repository: `docker-compose up -d`

Service will be available at `http://localhost:3000`

## Documentation
__Problem 1:__
Endpoint `/tour/matches` returns all the matches for a given tour name.
The endpoint latency increases linearly with the number of tours. Modify the endpoint to increase the performance.<br/>
__My Solution-__ To reduce the latency, I have opted for pagination. So, now the endpoint accepts `limit` and `page` as parameters and returns response as per them. Here `limit` is the number of responses that the service returns in one chunk and `page` is the chunk number of response that we want to get. The default value of `limit` is 10 and that of `page` is 1.
Example: `http://localhost:3000/tour/matches?name=Indian Premier League, 2023&limit=2&page=1`

__Problem 2:__
Modify the endpoint `/sport/tour/match` to also return match's id, startTime and format.<br/>
__My Solution-__ To return these additional information, the sql query present in models corresponding to this endpoint present in `getAllSportsToursAndMatches` has been modified.
Example: `http://localhost:3000/sport/tour/match`. This now return match id, start time and format of the test as well along with other details.

__Problem 3:__
Requirement: News Support for Matches and Tours<br/>
Functional Requirements:<br/>
    1. News can be created for a match or a tour.<br/>
    2. Each news created for a match also belongs to the corresponding tour.<br/>
    3. Each news created for a tour also belongs to the corresponding sport.<br/>
Technical Requirements:<br/>
    1. Create an endpoint to create news<br/>
    2. Create an endpoint to fetch news by match id<br/>
    3. Create an endpoint to fetch news by tour id<br/>
    4. Create an endpoint to fetch news by sport id<br/>
`News Model
{
    title: string,
    description: string
}`<br/>
__My Solution-__ To cater this, the database schema has been modified and an additional table `news` has been added. This table will have match_id, tour_id, sport_id associated with each news(wherever applicable). And this table will be used to fetch the news by match id, tour id and sport id.

To create a news, POST method is used. The news can be created:
1. By match:
	* `/news/create/match`
	* Example: http://localhost:3000/news/create/match and the body is set to RAW(JSON) having value
		`{
			"title":"RCB beats GT",
			"description":"RCB beats GT in the semi-finals with Virat Kohli smashing an amazing century.",
			"matchid":1
		}`
	* Creates a news as per the match id mentioned in the body. Also, updates the tour id & sport id associated with the match in `news` table.
2. By tour:
	* `/news/create/tour` 
	* Example: http://localhost:3000/news/create/tour and the body is set to RAW(JSON) having value
		`{
			"title":"IPL 2023 begins",
			"description":"IPL 2023 commences with inaugration ceremony at Narendra Modi Stadium, Ahmedabad.",
			"tourid":1
		}`
	* Creates a news as per the tour id mentioned in the body. Also, updates the sport id associated with the tour in `news` table.

To fetch the news, GET method is used. The news can be fetched:
1. By match id:
	* `/news/match`
		Example: `http://localhost:3000/news/match?matchid=1`
	* Return all the news related to a particular match id.
2. By tour id:
	* `/news/tour`
		Example: `http://localhost:3000/news/tour?tourid=1`
	* Returns all the news related to a particular tour id.
3. By sport id:
	* `/news/sport`
		Example: `http://localhost:3000/news/sport?sportid=1`
	* Returns all the news related to a particular sport id.
