import gql from "graphql-tag";

export class carsGraphql {
    public static addVehicle = gql`
    mutation addVehicle($data: AddVehicleInput!){
        addVehicle(data: $data) {
          id
        }
      }`;

    public static changeVehicle = gql`
    mutation changeVehicle($input: ChangeVehicle!){
      changeVehicle(input: $input) {
          id
          success
        }
      }`;
    
    public static removeVehicle = gql`
    mutation removeVehicle($id: ID!){
      removeVehicle(id:$id){
        id
        success
      }
    }`

    public static vehicleLandingAnnouncement = gql`
    query SearchVehicle($filter: VehicleFilterInput! $pagination: PaginationInput!){
      SearchVehicle(filter: $filter pagination: $pagination){
        vehicle {
          title
          id
          vehicleType
          brand
          model
          trim
          cityID
          years
          mileage
          mileageUnit
          created_at
          price {
            amount
            currency
          }
          is_urgent
          files{
            id
            name
            address
            mime_type
          }
          owner{
            id
          }
          desciption
          is_favourite
        }
        amount
        
      }
    }`;
    
    public static GetVehicleForEdit = gql`
    query getVehicleForEdit($id:ID!){
      getVehicleByID(id:$id){
        id
        vehicleType
        brand
        trim
        model
        cityID
        condition
        years
        mileage
        mileageUnit
        transmission
        colour
        bodyType
        feature
        lifeStyle
        airConditioning
        doorsAmount 
        seatsAmount
        fuelType
        engineSize
        power
        powerUnit
        cylinders
        fuelConsumtion
        capacity
        vehicleCapacityUnit
        motorhomeType
        vehicleLength
        vehicleLengthUnit
        truckType
        category
        vehicleWeight
        vehicleWeightUnit
        vehicleHeight
        vehicleHeightUnit
        vehicleLiftHeight
        vehicleLiftHeightUnit
        typeOfBeds
        numberOfBeds
        vehicleHistory
        ownersAmount
        title
        desciption
        price{
          amount
          currency
        }
        finance{
          firstInstalment
          mth
          currency
        }
        files{
          id
          name
          address
          mime_type
        }
        phoneNumber
        isRepossessed
        isDealer
      }
    }`;
    public static removeVehiclePhotos = gql`
    mutation removeVehiclePhotos($vehicle_id: ID! $ids: [ID!]!){
      removeVehiclePhotos(vehicle_id:$vehicle_id ids:$ids){
        id
        success
      }
    }`;

    public static GetAnnouncementById = gql`
    query getVehicleByID($id:ID!){
      getVehicleByID(id:$id){
        vehicleType
        truckType
        brand
        model
        cityID
        created_at
        years
        mileage
        mileageUnit
        transmission
        fuelType
        engineSize
        title
        desciption
        feature
        condition
        colour
        phoneNumber
        lifeStyle
        price{
          amount
          currency
        }
        finance{
          firstInstalment
          mth
          currency
        }
        files{
          id
          name
          address
          mime_type
        }
        is_favourite
        owner{
          id
        }
      }
    }`;

    public static saveVegicle = gql`
    mutation saveVehicle($ids: [ID!]!){
      saveVehicle(ids:$ids){
        id
        success
      }
    }`

    public static removeSavedVehicles = gql`
    mutation removeSavedVehicle($ids: [ID!]!){
      removeSavedVehicle(ids:$ids){
        id
        success
      }
    }`

    public static getSavedVehicles = gql`
    query getSavedVehicles($pagination: PaginationInput!){
      getSavedVehicles(pagination:$pagination){
        amount
        vehicle{          
          id
          vehicleType
          brand
          model
          trim
          cityID
          years
          mileage
          mileageUnit
          created_at
          price {
            amount
            currency
          }
          is_urgent
          files{
            id
            name
            address
            mime_type
          }
          owner{
            id
          }
          desciption
          is_favourite
        }
      }
    }`

    public static changeVehicleVisibility = gql`
    mutation changeVehicleVisibility($vehicle_id: ID! $is_visible: Boolean!){
      changeVehicleVisibility(vehicle_id: $vehicle_id is_visible: $is_visible){
        id
        success
    }
    }`
    
} 