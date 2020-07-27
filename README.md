# ArTIFFact-Control 
![logo](./src/renderer/assets/logos/logoWithLabelBlue.svg)

![CI](https://github.com/oSoc20/ArTIFFact-Control/workflows/CI/badge.svg)


A desktop application in which you can validate TIFF image files with information about cultural heritage collections.

## Contents
- [About](#about)
- [Used Technologies](#used-technologies)
	- [Installation Guide](#installation-guide)
- [Deployment Information](#deployment-information)
- [The Future](#the-future)
- [The Team](#the-team)
- [License](#license)
- [References](#references)

## About
Cultural heritage is something we like to preserve for future generations. 
Unfortunately, not all heritage artifacts are easily preservable. 
Digitalisation of those artifacts provides a solution to this problem. 
In order to digitise old artifacts, for example newspapers, TIFF files can be used. 
This is an uncompressed image format that contains a lot of technical information.
The internal structure of those files have great importance if we want to store them for the future. 
We have to know exactly what the files look like so that they can persist for a long time.

Digitisation of antique objects is one of the main occupations of Meemoo, the Flemish Institute for the Archives. 
Meemoo used to work with a tool called DPF Manager in order to check the internal structure of TIFF files.
This tool checks whether a TIFF file is compliant to a certain standard or not, if it follows some policy rules and so on. 
The DPF Manager application was a little outdated and not always very user friendly, so Meemoo asked to create a new and fresh interface that does the same as the DPF Manager does.

This is what the ArTIFFact Control application is. 
It is a newer version of the deprecated DPF Manager that validates the internal structure of TIFF files. 
Apart from a complete design overhaul, ArTIFFact Control uses an adapted version of JHOVE for the back-end. 
The application connects to the JHOVE REST API to validate the structure of the files containing cultural heritage objects.

<p align="center">
	<img src="https://meemoo.be/img/logo.svg" alt="meemoo"/> <img src="https://jhove.openpreservation.org/img/jhovelogo.png" alt="jhove"/>
</p>

### Used Technologies
ArTIFFact control uses the following technologies to achieve its goals:
- Figma: Figma was the design tool our designers used to create the new interface for the application. A link to the complete design can be found [here](https://www.figma.com/file/bJpNHJT4xGdcZAsjDO4car/OSOC-arTIFFact-control?node-id=286%3A2447).
- Electron: used to create the application. The benefit of Electron is that it is easy to create cross platform applications. This was requested by Meemoo, the client.
- Electron Builder: used to create an installer for the project and to build the project.
- TypeScript: the language that the project is written in. This was also requested by the client.
- React: React is the web framework that is used to render the application inside the Electron window. This application only uses functional components
	and hooks to manage the flow of the application.
- Material UI: a framework for React that contains a variety of components that are easily stylable.
- Webpack: used to bundle the code for better performance.
- Redux: a Redux store is used to manage the global state of the application.
- JHOVE REST API: as mentioned above, JHOVE is used as the back-end. The JHOVE REST API is an adapted web interface of the JHOVE application.
	JHOVE manages all validation specific actions. The front-end makes calls to the REST API.
- Axios: a JavaScript library used to make the network requests to JHOVE.
- Github Actions: Github actions is used for the continious deployment.

## Installation Guide
In order to build the application yourself, follow the next steps:
1. Clone or download this repository.
	> git clone https://github.com/oSoc20/ArTIFFact-Control.git
2. Use npm or yarn to install the project.
	> npm install *or* <br>
	> yarn install *or* <br>
	> yarn
3. When everything is completed, use the following command to start the application in development mode:
	> yarn start-dev *or* <br>
	> npm run start-dev
  
## Deployment information
At the moment, a Windows version of the application is deployed using Github Actions. The deployed versions
can be found [here](https://github.com/oSoc20/ArTIFFact-Control/releases).
In order to create a new release, follow the next steps:
1. Update the version number of the project in the `package.json` file (ex. 1.2.3)
2. Commit that change (`git commit -am v1.2.3`)
3. Tag your commit (`git tag v1.2.3`). Make sure the tag name's format is `v*.*.*`. The workflow will use this tag to detect when to create a release.
4. Push your changes to github (`git push && git push --tags`)

## The Future
ArTIFFact Control is not completed yet: there are still some parts that need to be added/tweaked. Below there are some items listed we think of right now
- Single file report: display the single file report when clicking on one in the multiple file report. 
	This single file report should contain all warnings and errors that are returned by JHOVE.
- Periodical checks: the flow for creating periodical checks is already designed in the 
	[Figma file](https://www.figma.com/file/bJpNHJT4xGdcZAsjDO4car/OSOC-arTIFFact-control?node-id=286%3A2447), but it is not yet implemented
	in the application.
- Create automatic deployment for both Linux and Mac.
- Determine what needs to be on the `Help` page. For example FAQ, basic file checking flow explanation, tutorial...
- ...

## The Team
| Member | Role |
| -------| -----|
| Bram De Coninck | Coach |
| Amber Perard | UI/UX Design |
| Tim Pensart | UI/UX Design |
| Christopher Denis | Frontend developer |
| Freek De Sagher | Frontend developer |

## License
This project is MIT licensed. Go to the [LICENSE](https://github.com/oSoc20/ArTIFFact-Control/blob/master/LICENSE) file for more information.

## References
 - JHOVE: https://jhove.openpreservation.org/
 - JHOVE REST API: https://github.com/openpreserve/jhove-rest
 - Meemoo: https://meemoo.be
 - Open Preservation: https://openpreservation.org/
 - Electron: https://www.electronjs.org/
 - React: https://reactjs.org/
 - TypeScript: https://www.typescriptlang.org/
 
<p align="right">
    <img src="https://raw.githubusercontent.com/oSoc20/ArTIFFact-Control/develop/src/renderer/assets/logos/osoc_logo%201.svg" alt="osoc"/>	
</p>
